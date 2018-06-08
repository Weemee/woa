import moment from 'moment';

module.exports = (sequelize, DataTypes) =>
{
	const CharacterUnlockedElements = sequelize.define('characterUnlockedElements',
	{
		charID:
		{
			type: DataTypes.INTEGER,
		},
		hydrogen:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 1,
		},
		helium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		lithium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		beryllium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		boron:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		carbon:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		nitrogen:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		oxygen:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		flourine:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		neon:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		sodium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		magnesium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		aluminium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		silicon:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		phosphorus:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		sulfur:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		chlorine:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		argon:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		potassium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		calcium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		scandium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		titanium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		vanadium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		chromium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		manganese:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		iron:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		cobalt:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		nickel:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		copper:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		zinc:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		gallium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		germanium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		arsenic:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		selenium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		bromine:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		krypton:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		rubidium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		strontium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		yttrium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		zirconium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		niobium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		molybdenum:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		technetium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		ruthenium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		rhodium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		palladium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		silver:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		cadmium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		indium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		tin:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		antimony:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		tellurium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		iodine:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		xenon:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		caesium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		barium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		lanthanum:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		cerium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		praseodymium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		neodymium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		promethium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		samarium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		europium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		gadolimium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		terbium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		dysprosium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		holmium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		erbium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		thulium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		ytterbium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		lutetium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		hafnium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		tantalum:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		tungsten:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		rhenium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		osmium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		iridium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		platinum:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		gold:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		mercury:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		thallium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		lead:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		bismuth:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		polonium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		astatine:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		radon:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		francium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		radium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		actinium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		thorium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		protactinium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		uranium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		neptunium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		plutonium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		americium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		curium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		berkelium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		californium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		einsteinium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		fermium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		mandelevium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		nobelium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		lawrencium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		rutherfordium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		dubnium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		seaborgium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		bohrium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		hassium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		meitnerium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		darmstadtium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		roentgenium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		copernicium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		nihonium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		flerovium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		moscovium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		livermorium:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		tennessine:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		oganesson:
		{
			type: DataTypes.BOOLEAN,
			defaultValue: 0,
		},
		createdAt:
		{
			type: DataTypes.DATE,
		},
		updatedAt:
		{
			type: DataTypes.DATE,
		},
	},
	{
		freezeTableName: true,
	});

	CharacterUnlockedElements.beforeCreate(async function(characterUnlockedElements) {
		characterUnlockedElements.updatedAt = moment().format('ddd, D MMM YYYY H:mm:ss [GMT]');
	});

	return CharacterUnlockedElements;
}
