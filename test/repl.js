const repl = require('repl');
const curriculum = require('../curriculum-basis/lib/curriculum.js');
curriculum.loadSchema('curriculum-basis/context.json','curriculum-basis/');
curriculum.loadSchema('context.json');

repl.start('> ').context.curriculum = curriculum;
