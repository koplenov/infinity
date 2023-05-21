namespace $.$$ {
	export class $koplenov_infinity_preview extends $.$koplenov_infinity_preview {
		@$mol_mem
		pics() {
			const data = { ...$mol_state_local.native() }
			const out = [] as any[]
			Object.entries( data ).map( ( [ key, value ] ) => {
				let obj = {}
				try{
					obj = JSON.parse( key )
				}
				catch(e){
					if (e instanceof Promise) {
						return $mol_fail_hidden(e);
					}
				}

				if( value === "true" && obj.seo_name )
					out.push( obj )
			} )
			return out
		}

		@$mol_mem
		Pics() {
			return this.pics().map( record => this.Pic( record ) )
		}

		@$mol_mem_key
		image( record: any ) {
			return record.src
		}

		@$mol_action
		download(){
			const links = this.pics().map(record => {
				// https://img-converter.com/en/text2img/ssbbw-fucked-by-two-guys-susgzx/
				return `https://img-converter.com/en/${record.from2to}/${record.seo_name}`
			})
			const data = links.join("\n")
			const filename = "links.txt";
			const blob = new Blob([data], {type: 'text/plain'});
			if((window.navigator as any).msSaveOrOpenBlob) {
				(window.navigator as any).msSaveBlob(blob, filename);
			}
			else{
				const elem = window.document.createElement('a');
				elem.href = window.URL.createObjectURL(blob);
				elem.download = filename;        
				document.body.appendChild(elem);
				elem.click();        
				document.body.removeChild(elem);
			}
		}
	}
}
