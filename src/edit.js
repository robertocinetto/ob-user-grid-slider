import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { title, subtitle } = attributes;

	//save fields onchange
	const onChangeTitle = ( newTitle ) => {
		setAttributes( { title: newTitle } );
	};
	const onChangeSubtitle = ( newSubtitle ) => {
		setAttributes( { subtitle: newSubtitle } );
	};

	return (
		<div { ...useBlockProps() }>
			{ /* Title block */ }
			<RichText
				placeholder={ __(
					'Title of the block',
					'ob-user-grid-slider'
				) }
				tagName="h2"
				value={ title }
				onChange={ onChangeTitle }
				allowedFormats={ [] }
			/>

			{ /* Subtitle block */ }
			<RichText
				placeholder={ __(
					'Subtitle of the block',
					'ob-user-grid-slider'
				) }
				tagName="h3"
				value={ subtitle }
				onChange={ onChangeSubtitle }
				allowedFormats={ [] }
			/>

			{ /* Import of the user grid block */ }
			<InnerBlocks allowedBlocks={ [ 'officebureau-ca/ob-user' ] } />
		</div>
	);
}
