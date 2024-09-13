import userModel from "../db/models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function registerUser(req, res) {
  try {
    const existingUser = await userModel.findOne({
      $or: [
        {
          email: req.body.email,
        },
        {
          username: req.body.username,
        },
      ],
    });
    if (existingUser) {
      if (existingUser.email === req.body.email) {
        return res.status(400).json({
          error: "Email already exists",
        });
      } else if (existingUser.username === req.body.username) {
        return res.status(400).json({
          error: "Username already exists",
        });
      }
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await userModel.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    if (newUser) {
      return res.status(201).json({
        message: "User registered successfully",
        success: true,
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
      success: false,
    });
  }
}

export async function loginUser(req, res) {
  try {
    const user = await userModel.findOne({
      username: req.body.username,
    });

    if (!user) {
      return res.status(401).json({
        error: "Invalid username",
      });
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordMatch) {
      return res.status(401).json({
        error: "Invalid password",
        success: false,
      });
    }

    const token = jwt.sign(
      {
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
      sameSite: "strict",
    });

    if (token) {
      res.status(200).json({
        token,
        success: true,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
      success: false,
    });
  }
}

export async function logOutUser(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "Logout successful",
    success: true,
  });
}

export async function updateUserCredentials(req, res) {
  try {
    const user = await userModel.findOne({
      username: req.user.username,
    });
    if (!user) {
      return res.status(404).json({
        error: "User not found",
        success: false,
      });
    }
    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10);
    }
    user.email = req.body.email || user.email;
    await user.save();

    res.status(200).json({
      message: "User updated successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        password: user.password,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function deleteUser(req, res) {
  try {
    const user = await userModel.findOne({
      email: req.body.email,
    });
    if (req.user.username !== user.username) {
      return res.status(403).json({
        error: "Error: You do not have permission to delete this user",
        success: false,
      });
    }

    const deletedUser = await user.deleteOne();
    return res.status(201).json({
      message: "Deleting user was successful",
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      error: "Internal server error",
      success: false,
    });
  }
}

export async function getList(req, res) {
  try {
    const user = await userModel.findOne({ username: req.user.username });
    if (user) {
      return res.status(200).json({ success: true, content: user.list });
    } else {
      return res.status(404).json({ success: false, message: "Not Found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export async function updateList(req, res) {
  try {
    const user = await userModel.findOne({
      username: req.user.username,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const list = user.list || [];
    const content = req.body;
    const contentExists = list.some((item) => item.id === content.id);

    if (!contentExists) {
      list.push(content);
      await user.updateOne({
        list: list,
      });
      return res.status(200).json({
        message: "List updated successfully",
        success: true,
      });
    } else {
      return res.status(200).json({
        message: "Movie already in history",
        success: false,
      });
    }
  } catch (error) {
    console.error("Error updating history:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
}

export async function removeFromList(req, res) {
  try {
    const user = await userModel.findOne({
      username: req.user.username,
    });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const list = user.list || [];
    const content = req.body;
    const contentExists = list.some((item) => item.id === content.id);

    if (contentExists) {
      const updatedList = list.filter((item) => item.id !== content.id);
      await user.updateOne({
        list: updatedList,
      });
      return res.status(200).json({
        message: "Movie removed from list",
        success: true,
      });
    } else {
      return res.status(404).json({
        message: "Movie not found in list",
        success: false,
      });
    }
  } catch (error) {
    console.error("Error removing from list:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
}
