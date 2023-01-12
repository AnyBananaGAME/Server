/******************************************\
 *  ____  _            ____  _         _  *
 * | __ )| |_   _  ___| __ )(_)_ __ __| | *
 * |  _ \| | | | |/ _ \  _ \| | '__/ _` | *
 * | |_) | | |_| |  __/ |_) | | | | (_| | *
 * |____/|_|\__,_|\___|____/|_|_|  \__,_| *
 *                                        *
 * This file is licensed under the GNU    *
 * General Public License 3. To use or    *
 * modify it you must accept the terms    *
 * of the license.                        *
 * ___________________________            *
 * \ @author BlueBirdMC Team /            *
\******************************************/

const Block = require("../Block");
const Tool = require("../Tool");

class PolishedAndesite extends Block {
	maxStack = 64;
	tool = Tool.pickaxe;
	blastResistance = 6;
	hardness = 1.5;
	isLuminant = false;
	isTransparrent = false;
	isFlammable = false;
	catchesFireFromLava = false;

	constructor() {
		super("minecraft:stone", 6);
	}
}

module.exports = PolishedAndesite;