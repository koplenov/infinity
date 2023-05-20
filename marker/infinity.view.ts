
namespace $.$$ {
	interface Record {
		src: string
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
			return $mol_fetch.json( uri ) as Record[]
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
		image( data: Record ) {
			// $mol_wire_solid()
			return data.src
		}
	}
}
