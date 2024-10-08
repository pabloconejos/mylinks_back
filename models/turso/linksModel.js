/* eslint-disable camelcase */
import { client } from '../../utils/index.js'

export class LinksModel {
  static async setLink ({ input, userId }) {
    const idLink = crypto.randomUUID()
    const { description, title, image_id, linkUrl } = input
    try {
      const { rows } = await client.execute('SELECT id FROM linkspage WHERE user_id = ?', [userId])
      const pageId = rows[0].id
      const { rowsAffected } = await client.execute('INSERT INTO links (id, user_id, page_id, url, title, description, image_id) VALUES (?,?,?,?,?,?,?)', [idLink, userId, pageId, linkUrl, title, description, image_id])
      if (rowsAffected >= 1) {
        return idLink
      } else {
        throw new Error('Insertion Error')
      }
    } catch (e) {
      throw new Error(e)
    }
  }

  static async getLinks ({ userId }) {
    try {
      const { rows } = await client.execute(`
        SELECT 
          l.id AS id,
          l.user_id AS userId,
          l.page_id AS pageId,
          l.url as linkUrl,
          l.title,
          l.description,
          l.creation_date AS creationDate,
          l.image_id as imageId,
          lsi.name as imageName,
          lsi.url as imageUrl 
        FROM links l 
        LEFT JOIN links_images lsi ON l.image_id = lsi.id 
        WHERE 
          userid = ?`, [userId])
      return rows
    } catch (e) {
      throw new Error(e)
    }
  }

  static async deleteLink ({ userId, linkId }) {
    try {
      await client.execute('DELETE FROM links WHERE id = ? AND user_id = ?', [linkId, userId])
      return linkId
    } catch (e) {
      throw new Error(e)
    }
  }

  static async editLink ({ userId, link }) {
    const { title, description, linkUrl, image_id } = link

    try {
      await client.execute(`
        UPDATE links
        SET 
          url = ?,
          title = ?,
          description = ?,
          image_id = ?
        WHERE 
          id = ? 
          AND user_id = ?
      `, [linkUrl, title, description, image_id, link.id, userId])
      return link.id
    } catch (e) {
      throw new Error(e)
    }
  }

  static async getLinksImages () {
    try {
      const { rows } = await client.execute('SELECT * FROM links_images')
      if (rows.length > 0) {
        return rows
      } else {
        throw new Error('images not found')
      }
    } catch (e) {
      throw new Error('images not found')
    }
  }
}
