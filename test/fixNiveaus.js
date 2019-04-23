	var curriculum       = require('../lib/curriculum.js');
	var doelenSchema     = curriculum.loadSchema('curriculum-doelen/context.json','curriculum-doelen/');
	var kerndoelenSchema = curriculum.loadSchema('context.json');

	var niveauIndex = {};

	curriculum.data.niveau.forEach((n) => { niveauIndex[n.title.toLowerCase()] = n.id; });

	var kerndoelen = curriculum.data.kerndoel.map(function(kerndoel) {
		if (kerndoel.level) {
			kerndoel = curriculum.clone(kerndoel);
			var levels = kerndoel.level.split(',').map((l) => l.trim());
			var niveaus = levels.map((l) => {
				return niveauIndex[l.toLowerCase()];
			});	
			kerndoel.niveau_id = niveaus;
			delete kerndoel.level;
		} else {
			console.error('kerndoel '+kerndoel.id+' mist levels');
		}
		return kerndoel;
	});

	curriculum.data.kerndoel = kerndoelen;

	curriculum.exportFiles(kerndoelenSchema);