-- GitHub Profile Analyzer Database Schema
-- Create database
CREATE DATABASE IF NOT EXISTS github_analyzer;
USE github_analyzer;

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  avatar_url TEXT,
  name VARCHAR(255),
  bio TEXT,
  public_repos INT DEFAULT 0,
  followers INT DEFAULT 0,
  following INT DEFAULT 0,
  created_at DATETIME,
  updated_at DATETIME,
  location VARCHAR(255),
  company VARCHAR(255),
  blog TEXT,
  email VARCHAR(255),
  type VARCHAR(50),
  site_admin TINYINT(1) DEFAULT 0,
  INDEX idx_username (username),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
