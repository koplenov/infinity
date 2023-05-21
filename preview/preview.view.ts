namespace $.$$ {
	export class $koplenov_infinity_preview extends $.$koplenov_infinity_preview {
		@$mol_mem
		@$mol_action
		pics() {
			const data = { ...$mol_state_local.native() }
			const out = [] as any[]
			Object.entries( data ).map( ( [ key, value ] ) => {
				if( key.includes( "_checked" ) && $mol_state_local.value( key ) )
					out.push( key.replace( "_checked", "" ) )
			} )
			$mol_wire_sync( console.log )( { out } )

			return out
		}

		@$mol_mem
		pics_for_merge() {
			return this.pics().filter( seo_name => $mol_state_local.value( seo_name + "_marked" ) === "for_merge" )
		}
		@$mol_mem
		Pics_merge() {
			return this.pics_for_merge().map( seo_name => this.Pic( seo_name ) )
		}

		@$mol_mem
		pics_for_delete() {
			return this.pics().filter( seo_name => $mol_state_local.value( seo_name + "_marked" ) === "for_delete" )
		}
		@$mol_mem
		Pics_delete() {
			return this.pics_for_delete().map( seo_name => this.Pic( seo_name ) )
		}

		@$mol_mem_key
		image( seo_name: any ) {
			return ( $mol_state_local.value( seo_name + "_content" ) as any ?? { src: "" } ).src
		}

		@$mol_action
		download_merge() {
			const links = this.pics_for_merge().map( seo_name => {
				// https://img-converter.com/en/text2img/ssbbw-fucked-by-two-guys-susgzx/
				const from2to = ( $mol_state_local.value( seo_name + "_content" ) as any ?? { from2to: "gg" } ).from2to
				return `https://img-converter.com/en/${ from2to }/${ seo_name }`
			} )
			const data = links.join( "\n" )
			const filename = `links-merge-${ ( new Date() ).toISOString() }.txt`
			this.download( filename, data )
		}

		@$mol_action
		download_delete() {
			const links = this.pics_for_delete().map( seo_name => {
				// https://img-converter.com/en/text2img/ssbbw-fucked-by-two-guys-susgzx/
				const from2to = ( $mol_state_local.value( seo_name + "_content" ) as any ?? { from2to: "gg" } ).from2to
				return `https://img-converter.com/en/${ from2to }/${ seo_name }`
			} )
			const data = links.join( "\n" )
			const filename = `links-delete-${ ( new Date() ).toISOString() }.txt`
			this.download( filename, data )
		}

		@$mol_action
		download( filename: string, data: any ) {
			const blob = new Blob( [ data ], { type: 'text/plain' } )
			if( ( window.navigator as any ).msSaveOrOpenBlob ) {
				( window.navigator as any ).msSaveBlob( blob, filename )
			}
			else {
				const elem = window.document.createElement( 'a' )
				elem.href = window.URL.createObjectURL( blob )
				elem.download = filename
				document.body.appendChild( elem )
				elem.click()
				document.body.removeChild( elem )
			}
		}
	}
}
