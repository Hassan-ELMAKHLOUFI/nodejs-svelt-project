<script>
	export let movies=[] ;
	import {onMount} from "svelte";
	import Genre from './Genre.svelte';
	import  Nav from './Nav.svelte';

    export  let pagination={};
	onMount( () => {
		getMovies();
});
async function getMovies(){
    await fetch(`http://localhost:3000/movies/?take=10&skip=0`)
        .then(r => r.json())
        .then(data => {
			console.log(data.data)
            movies = data.data;
			pagination={take:10,skip:0}
			
        });
}

async function getMoviesPaginated(skip){
	var laux
	if(skip==="+1"){
		laux=parseInt(pagination.skip)+10
	}else if(skip==="-1"){
		laux=parseInt(pagination.skip)-10
	}else{laux=parseInt(skip)*10;}
    await fetch(`http://localhost:3000/movies/?take=10&skip=${laux}`)
        .then(r => r.json())
        .then(data => {
			console.log(data.data)
            movies = data.data;
			pagination={take:10,skip:laux}
			
        });
}
</script>

<main>
	<Nav/>

	<div class="container">
	<table  class="table">
		<thead class="thead-dark">
		  <tr>
			<!-- <th scope="col">#</th> -->
			<th scope="col">Id</th>
			<th scope="col">Titre</th>
			<th scope="col">Genre</th>
			<th scope="col">Year</th>
		   
		  </tr>
		</thead>
		<tbody>
			{#each  movies as movie(movie.id) }
			<tr>
				<td style="padding-right:50px;">{movie.id }</td>
				<td style="padding-right:50px;">{movie.title }</td>
				<td style="padding-right:50px;">
					
					<Genre genres ={movie.genres}/>
				</td>
				<td style="padding-right:50px;">{movie.year}</td>
			   </tr>	
			{/each}

		</tbody>          
	  </table>
	</div>
	<nav style="margin-left:40%" aria-label="Page navigation example">
		<ul class="pagination">
		  <li class="page-item"><button class="page-link" on:click={()=>getMoviesPaginated("-1")} >Previous</button></li> 
		  <li class="page-item"><button  class="page-link" on:click={()=>getMoviesPaginated(1)}>1</button></li>
		  <li class="page-item"><button class="page-link" on:click={()=>getMoviesPaginated(2)} >2</button></li>
		  <li class="page-item"><button class="page-link" on:click={()=>getMoviesPaginated(3)}>3</button></li>
		  <li class="page-item"><button class="page-link" on:click={()=>getMoviesPaginated("+1")} >Next</button></li>
		</ul>
	  </nav>
</main>

  <style>
 table{
	 margin-top: 150px;
 }
</style>