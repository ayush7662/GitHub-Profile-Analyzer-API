const { promisePool } = require('../config/database');

class Profile {

  
  static async create(profileData) {

    const query = `
      INSERT INTO profiles 
      (
        username,
        avatar_url,
        name,
        bio,
        public_repos,
        followers,
        following,
        created_at,
        updated_at,
        location,
        company,
        blog,
        email,
        type,
        site_admin
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)

      ON DUPLICATE KEY UPDATE
        avatar_url = VALUES(avatar_url),
        name = VALUES(name),
        bio = VALUES(bio),
        public_repos = VALUES(public_repos),
        followers = VALUES(followers),
        following = VALUES(following),
        updated_at = VALUES(updated_at),
        location = VALUES(location),
        company = VALUES(company),
        blog = VALUES(blog),
        email = VALUES(email),
        type = VALUES(type),
        site_admin = VALUES(site_admin)
    `;

    const values = [
      profileData.login,
      profileData.avatar_url,

      profileData.name || null,
      profileData.bio || null,

      profileData.public_repos || 0,
      profileData.followers || 0,
      profileData.following || 0,

      
      new Date(profileData.created_at),
      new Date(profileData.updated_at),

      profileData.location || null,
      profileData.company || null,
      profileData.blog || null,
      profileData.email || null,

      profileData.type || null,

      profileData.site_admin ? 1 : 0
    ];

    await promisePool.execute(query, values);

    return this.findByUsername(profileData.login);
  }

 
  static async findAll() {

    const query = `
      SELECT * 
      FROM profiles
      ORDER BY id DESC
    `;

    const [rows] = await promisePool.execute(query);

    return rows;
  }

 
  static async findByUsername(username) {

    const query = `
      SELECT * 
      FROM profiles
      WHERE username = ?
    `;

    const [rows] = await promisePool.execute(query, [username]);

    return rows[0];
  }

  
  static async findById(id) {

    const query = `
      SELECT *
      FROM profiles
      WHERE id = ?
    `;

    const [rows] = await promisePool.execute(query, [id]);

    return rows[0];
  }

  
  static async delete(username) {

    const query = `
      DELETE FROM profiles
      WHERE username = ?
    `;

    await promisePool.execute(query, [username]);
  }
}

module.exports = Profile;