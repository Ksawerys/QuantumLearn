const { Subnote, User, Tag, Note } = require('../models');

const validateSubnote = async (req, res, next) => {
    const { subnoteId, noteId } = req.body;
  
    if (subnoteId) {
      const subnote = await Subnote.findByPk(subnoteId);
      if (!subnote || subnote.note_id === noteId) {
        return res.status(400).json({ msg: 'Subnote no válido' });
      }
    }
  
    next();
  };
  
  const validateUser = async (req, res, next) => {
    const { userId } = req.body;
  
    if (userId) {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(400).json({ msg: 'Usuario no válido' });
      }
    }
  
    next();
  };
  
  const validateTags = async (req, res, next) => {
    const { tagIds } = req.body;
  
    if (tagIds && tagIds.length > 0) {
      const tags = await Tag.findAll({ where: { id: tagIds } });
      if (tags.length !== tagIds.length || tags.some(tag => !tag.active)) {
        return res.status(400).json({ msg: 'Etiquetas no válidas' });
      }
    }
  
    next();
  };
  
  module.exports = { validateSubnote, validateUser, validateTags };
module.exports = { validateEntities };