
namespace $.$$ {
	interface $koplenov_infinity_record {
		id: number
		src: string
		seo_name: string
		from2to: string
	}

	export class $koplenov_infinity_marker extends $.$koplenov_infinity_marker {
		// отображаем Row
		@$mol_mem_key
		Pics( index: any ) {
			return this.links( index ).reverse().map( data => this.Pic( data ) )
		}

		// получаем страницу данных
		@$mol_mem_key
		links( page: number ) {
			const uri = `https://ai.img-converter.com/report/${ this.Formats().value() }?page=${ page || 1 }&count=${ this.chunk_size() }&query=`
			return $mol_fetch.json( uri ) as $koplenov_infinity_record[]
		}

		// ээ, шото необходимое для работы подзагрузки
		@$mol_mem_key
		after( anchor_id: number ) {
			return Array.from(
				{ length: this.chunk_size() },
				( _, index ) => ( anchor_id ?? 0 ) + index + 1,
			)
		}

		@$mol_mem_key
		image( data: $koplenov_infinity_record ) {
			return data.src
		}

		@$mol_mem_key
		checked( record: $koplenov_infinity_record, next?: any ) {
			return $mol_state_local.value( JSON.stringify( record ), next ) ?? false
		}
	}
}
