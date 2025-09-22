export const UICONSTANTS = {
	EntryPage: {
		padding: 4,
		padding_xs: 2,
		// spacing between each sections - ConfigSection to TenderCountContainer or TenderCountContainer to TenderCountContainer
		spacing: 3.5
	},
	ConfigSection: {
		// padding should be defined in @/components/Styled/PaperContainer
		padding: 3,
		padding_xs: 3,
		// spacing between each Config Components, both row and column
		spacing: 3,
		// at sm & md breakpoints, the grid should change to single column
		spacing_xs: 2
	},
	ConfigComponent: {
		// spacing between title and component eg. 'Currency' title & 'CurrencySelect' component
		spacing: 2,
		spacing_xs: 1.5
	},
	TenderCountContainer: {
		// padding for TenderCountContainer uses the same valye from ConfigSection
		// defined in @/components/Styled/PaperContainer

		// spacing in between the title and divider
		spacing_title_divider: 2,
		spacing_title_divider_xs: 1.5,
		// spacing in between the divider and CountGrid component
		spacing_title_countgrid: 3,
		spacing_title_countgrid_xs: 2.5
	},
	SummaryPage: {
		padding: 4,
		padding_xs: 2,
		// spacing between the DateTime element and the main content of the page
		spacing: 3.5,
		spacing_xs: 3.5
	},
	SummarySection: {
		padding: 4,
		padding_xs: 3,
		spacing: 4,
		spacing_xs: 3
	},
	VarianceSection: {
		padding: 4,
		padding_xs: 3,
		spacing: 4,
		spacing_xs: 3
	},
	VarianceDetailContent: {
		spacing: 4
	},
	VarianceDial: {
		size: 250,
		size_xs: 200,
		thickness: 4
	},
	Button: {
		spacing: 4,
		spacing_xs: 2
	}
};

export const FONTSIZE = {
	heading_semibold: 30,
	heading_medium: 20,
	body_regular: 20,

	sectionTitle: 26,
	sectionTitle_xs: 20,
	buttonLabel: 16,
	buttonLabel_xs: 14,
	tenderCountTitle: 24,
	tenderCountTitle_xs: 20,
	varianceDialLabel: 48,
	varianceDialLabel_xs: 38,
	dateTimeLabel: 24,
	dateTimeLabel_xs: 22
};
