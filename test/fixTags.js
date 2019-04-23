	const uuidv4 = require('uuid/v4');
	var curriculum       = require('../lib/curriculum.js');
	var doelenSchema     = curriculum.loadSchema('curriculum-doelen/context.json','curriculum-doelen/');
	var kerndoelenSchema = curriculum.loadSchema('context.json');

	var tagIndex = {};
	
	curriculum.data.tag.forEach((t) => {tagIndex[t.title] = t.id;});
	curriculum.data.tag = curriculum.clone(curriculum.data.tag);

	['kerndoel','kerndoel_domein','kerndoel_vakleergebied','kerndoel_uitstroomprofiel'].forEach(function(list) {
		console.log(list);
		var newList = curriculum.data[list].map(function(entity) {
			if (entity.tags) {
				var entity = curriculum.clone(entity);
				var tags = entity.tags.split(',').map((t) => t.trim());
				entity.tag_id = tags.map((t) => {
					if (!tagIndex[t]) {
						tagIndex[t] = uuidv4();
						curriculum.data.tag.push({
							id: tagIndex[t],
							title: t
						});
					}
					return tagIndex[t];
				});
				delete entity.tags;
			}
			return entity;
		});
		curriculum.data[list] = newList;
	});

	curriculum.exportFiles(doelenSchema, 'curriculum-doelen/');
	curriculum.exportFiles(kerndoelenSchema);