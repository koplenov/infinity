
namespace $.$$ {
	interface Record {
		src: string
	}

	export class $koplenov_infinity extends $.$koplenov_infinity {
		// отображаем Row
		@$mol_mem_key
		Pics( index: any ) {
			// let page_size = this.chunk_size()
			// let page = Math.floor( index / page_size )
			return this.links( index ).map( data => this.Pic( data ) )// [this.Pic(this.links( page )[ index % page_size ])]
		}
		// получаем страницу данных
		@$mol_mem_key
		links( page: number ) {
			const uri = `https://ai.img-converter.com/report/all?type=last&page=${ page || 1 }&limit=${ this.chunk_size() }&query=`
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
			$mol_wire_solid()
			return data.src
		}
	}
}
