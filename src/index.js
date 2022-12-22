import { registerBlockType } from '@wordpress/blocks';
import './ob-user';
import './style.scss';
import Edit from './edit';
import Save from './save';
import metadata from './block.json';

registerBlockType( metadata.name, {
	attributes: {
		// main title attribute
		title: {
			type: 'string',
			source: 'html',
			selector: 'h2',
		},
		// subtitle attribute
		subtitle: {
			type: 'string',
			source: 'html',
			selector: 'h3',
		},
	},
	edit: Edit,
	save: Save,
} );
