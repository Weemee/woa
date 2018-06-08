import moment from 'moment';

module.exports = (sequelize, DataTypes) =>
{
	const CharacterResources = sequelize.define('characterResources',
	{
		charID:
		{
			type: DataTypes.INTEGER,
		},
		hydrogen:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		helium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		lithium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		beryllium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		boron:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		carbon:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		nitrogen:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		oxygen:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		flourine:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		neon:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		sodium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		magnesium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		aluminium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		silicon:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		phosphorus:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		sulfur:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		chlorine:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		argon:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		potassium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		calcium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		scandium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		titanium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		vanadium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		chromium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		manganese:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		iron:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		cobalt:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		nickel:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		copper:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		zinc:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		gallium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		germanium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		arsenic:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		selenium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		bromine:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		krypton:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		rubidium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		strontium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		yttrium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		zirconium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		niobium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		molybdenum:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		technetium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		ruthenium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		rhodium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		palladium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		silver:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		cadmium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		indium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		tin:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		antimony:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		tellurium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		iodine:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		xenon:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		caesium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		barium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		lanthanum:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		cerium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		praseodymium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		neodymium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		promethium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		samarium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		europium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		gadolimium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		terbium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		dysprosium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		holmium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		erbium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		thulium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		ytterbium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		lutetium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		hafnium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		tantalum:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		tungsten:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		rhenium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		osmium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		iridium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		platinum:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		gold:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		mercury:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		thallium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		lead:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		bismuth:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		polonium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		astatine:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		radon:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		francium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		radium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		actinium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		thorium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		protactinium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		uranium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		neptunium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		plutonium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		americium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		curium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		berkelium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		californium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		einsteinium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		fermium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		mandelevium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		nobelium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		lawrencium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		rutherfordium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		dubnium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		seaborgium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		bohrium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		hassium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		meitnerium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		darmstadtium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		roentgenium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		copernicium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		nihonium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		flerovium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		moscovium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		livermorium:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		tennessine:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
		},
		oganesson:
		{
			type: DataTypes.JSON,
			defaultValue: {
				max: 100,
				owned: 0
			},
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

	CharacterResources.beforeCreate(async function(characterResources, options) {
		characterResources.updatedAt = moment().format('ddd, D MMM YYYY H:mm:ss [GMT]');
	});

	CharacterResources.beforeUpdate(async(characterResources, options) => {
		characterResources.updatedAt = moment().format('ddd, D MMM YYYY H:mm:ss [GMT]');
	});

	return CharacterResources;
}
