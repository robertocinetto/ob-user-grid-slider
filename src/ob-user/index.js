import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import Edit from './edit';
import Save from './save';

registerBlockType( 'officebureau-ca/ob-user', {
	title: __( 'O/B User', 'ob-user-grid-slider' ),
	description: 'A user in the grid',
	icon: 'admin-users',
	keywords: [ 'user', 'office', 'bureau' ],
	parent: [ 'officebureau-ca/ob-user-grid-slider' ],
	supports: {
		reusable: false,
		html: false,
	},
	attributes: {
		//user category attribute
		category: {
			type: 'text',
			source: 'html',
			selector: 'h4',
		},
		//user fullname attribute
		fullname: {
			type: 'text',
			source: 'html',
			selector: 'h3',
		},
		//user pronoun attribute
		pronoun: {
			type: 'text',
			source: 'html',
			selector: 'h5',
		},
		//user images attributes
		id: {
			type: 'number',
		},
		alt: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'alt',
			default: '',
		},
		url: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'src',
		},
		//user interests attribute
		interests: {
			type: 'array',
			default: [ { text: 'Assign an interest' } ],
		},
	},
	edit: Edit,
	save: Save,
} );
