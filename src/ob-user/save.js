import { useBlockProps, RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import placeholder from '../assets/user-placeholder.png';

export default function Save( { attributes } ) {
	const { category, fullname, pronoun, url, alt, interests } = attributes;

	return (
		<div { ...useBlockProps.save( { className: 'ob-user-grid-elem' } ) }>
			{ url ? (
				<img src={ url } alt={ alt } />
			) : (
				<img src={ placeholder } alt="user placeholder" />
			) }
			<RichText.Content
				tagName="h4"
				value={ category.toUpperCase() }
				data-category={ category.toUpperCase() }
			/>
			<RichText.Content tagName="h3" value={ fullname } />
			<RichText.Content tagName="h5" value={ pronoun } />

			<h4 className="ob-interests">
				{ __( 'ITERESTS', 'ob-user-grid-slider' ) }
			</h4>
			{ interests.length > 0 && (
				<ul>
					{ interests.map( ( item, index ) => {
						return <li key={ index }>{ item.text }</li>;
					} ) }
				</ul>
			) }
		</div>
	);
}
