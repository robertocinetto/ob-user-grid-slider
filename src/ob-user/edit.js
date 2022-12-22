/**
 * IMPORTS
 */
import { useEffect, useState } from '@wordpress/element';
import {
	useBlockProps,
	RichText,
	MediaPlaceholder,
	BlockControls,
	MediaReplaceFlow,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { isBlobURL, revokeBlobURL } from '@wordpress/blob';
import {
	Spinner,
	withNotices,
	ToolbarButton,
	SelectControl,
	Icon,
	Tooltip,
	TextControl,
	Button,
} from '@wordpress/components';
import placeholder from '../assets/user-placeholder.png';

/**
 * MAIN COMPONENT DEFINITION
 */

function Edit( {
	attributes,
	setAttributes,
	noticeOperations,
	noticeUI,
	isSelected,
} ) {
	const { category, fullname, pronoun, url, alt, id, interests } = attributes;

	const [ blobURL, setBlobURL ] = useState();
	const [ selectedInterest, setSelectedInterest ] = useState();

	//save fields onchange
	const onChangeCategory = ( newCategory ) => {
		setAttributes( { category: newCategory } );
	};
	const onChangeFullname = ( newFullname ) => {
		setAttributes( { fullname: newFullname } );
	};
	const onChangePronoun = ( newPronoun ) => {
		setAttributes( { pronoun: newPronoun } );
	};

	const onSelectImage = ( image ) => {
		if ( ! image || ! image.url ) {
			setAttributes( { url: undefined, id: undefined, alt: '' } );
			return;
		}
		setAttributes( { url: image.url, id: image.id, alt: image.alt } );
	};

	const onSelectURL = ( newURL ) => {
		setAttributes( {
			url: newURL,
			id: undefined,
			alt: '',
		} );
	};

	const onRemoveImage = () => {
		setAttributes( { url: undefined, id: undefined, alt: '' } );
	};

	//display image upload related errors
	const onUploadError = ( message ) => {
		noticeOperations.removeAllNotices();
		noticeOperations.createErrorNotice( message );
	};

	const addNewInterest = () => {
		setAttributes( {
			interests: [ ...interests, { text: 'New interest' } ],
		} );
		setSelectedInterest( interests.length );
	};

	const updateInterest = ( text ) => {
		const interestsCopy = [ ...interests ];
		interestsCopy[ selectedInterest ].text = text;
		setAttributes( { interests: interestsCopy } );
	};

	const deleteInterest = () => {
		setAttributes( {
			interests: [
				...interests.slice( 0, selectedInterest ),
				...interests.slice( selectedInterest + 1 ),
			],
		} );
		setSelectedInterest( undefined );
	};

	//check at editor loading if there's a old blob url
	useEffect( () => {
		if ( ! id && isBlobURL( url ) ) {
			setAttributes( {
				url: undefined,
				alt: '',
			} );
		}
	}, [] );

	//clear blob url once the image is uploaded
	useEffect( () => {
		if ( isBlobURL( url ) ) {
			setBlobURL( url );
		} else {
			revokeBlobURL( blobURL );
			setBlobURL();
		}
	}, [ url ] );

	return (
		<>
			{ /* if image is uploaded display replace/remove functionalities/commands */ }
			{ url && (
				<BlockControls group="inline">
					<MediaReplaceFlow
						name={ __( 'Replace Image', 'ob-user-grid-slider' ) }
						onSelect={ onSelectImage }
						onSelectURL={ onSelectURL }
						onError={ onUploadError }
						accept="image/*"
						allowedTypes={ [ 'image' ] }
						mediaId={ id }
						mediaURL={ url }
					/>
					<ToolbarButton onClick={ onRemoveImage }>
						{ __( 'Remove image', 'ob-user-grid-slider' ) }
					</ToolbarButton>
				</BlockControls>
			) }
			<div { ...useBlockProps() }>
				{ /* if image is not uploaded display placeholder */ }
				{ url ? (
					<div
						className={ `ob-grid-element-img ${
							isBlobURL( url ) ? ' is-loading' : ''
						}` }
					>
						<img src={ url } alt={ alt } />

						{ /*display a spinner during upload*/ }
						{ isBlobURL( url ) && <Spinner /> }
					</div>
				) : (
					<img src={ placeholder } alt="user placeholder" />
				) }

				{ /* image upload field */ }
				<MediaPlaceholder
					icon="admin-users"
					onSelect={ onSelectImage }
					onSelectURL={ onSelectURL }
					onError={ onUploadError }
					accept="image/*"
					allowedTypes={ [ 'image' ] }
					disableMediaButtons={ url }
					notices={ noticeUI }
				/>

				{ /* category field */ }
				<RichText
					placeholder={ __( 'User category', 'ob-user-grid-slider' ) }
					tagName="h4"
					value={ category }
					onChange={ onChangeCategory }
					allowedFormats={ [] }
				/>

				{ /* fullname field */ }
				<RichText
					placeholder={ __( 'User name', 'ob-user-grid-slider' ) }
					tagName="h3"
					value={ fullname }
					onChange={ onChangeFullname }
					allowedFormats={ [] }
				/>

				{ /* pronouns select */ }
				<SelectControl
					label={ __( 'User pronoun', 'ob-user-grid-slider' ) }
					value={ pronoun }
					options={ [
						{ label: 'Select a pronoun', value: '' },
						{ label: 'He', value: 'He' },
						{ label: 'She', value: 'She' },
						{ label: 'They', value: 'They' },
					] }
					onChange={ onChangePronoun }
					__nextHasNoMarginBottom
				/>

				{ /* interests field */ }
				<div className="wp-block-officebureau-ca-ob-user-grid-slider-interests">
					<span className="interests-label">Interests</span>
					<ul>
						{ interests?.length > 0 &&
							interests.map( ( item, index ) => {
								return (
									<li
										key={ index }
										className={
											selectedInterest === index
												? 'is-selected'
												: ''
										}
									>
										<button
											aria-label={ __(
												'Edit interest',
												'ob-user-grid-slider'
											) }
											onClick={ () =>
												setSelectedInterest( index )
											}
										>
											{ item.text }
										</button>
									</li>
								);
							} ) }
						{ isSelected && (
							<li className="wp-block-officebureau-ca-ob-user-grid-slider-add-icon-li">
								<Tooltip
									text={ __(
										'Add interest',
										'ob-user-grid-slider'
									) }
								>
									<button
										aria-label={ __(
											'Add interest',
											'ob-user-grid-slider'
										) }
										onClick={ addNewInterest }
									>
										<Icon icon="plus" />
									</button>
								</Tooltip>
							</li>
						) }
					</ul>
				</div>

				{ /* edit/delete interest field */ }
				{ selectedInterest !== undefined && (
					<div className="wp-block-officebureau-ca-ob-user-grid-slider-interest-form">
						<TextControl
							label={ __( 'Interest', 'ob-user-grid-slider' ) }
							value={ interests[ selectedInterest ].text }
							onChange={ updateInterest }
						/>
						<Button isDestructive onClick={ deleteInterest }>
							{ __( 'Remove interest', 'ob-user-grid-slider' ) }
						</Button>
					</div>
				) }
			</div>
		</>
	);
}

export default withNotices( Edit );
