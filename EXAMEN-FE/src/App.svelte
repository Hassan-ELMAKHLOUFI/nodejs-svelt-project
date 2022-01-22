<script>
	export let movies=[] ;
	import {onMount} from "svelte";
	import Genre from './Genre.svelte';
	import  Nav from './Nav.svelte'



	onMount(async () => {
    await fetch(`http://localhost:3000/movies/?take=10&skip=1`)
        .then(r => r.json())
        .then(data => {
			console.log(data.data)
            movies = data.data;
        });
});

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
</main>

<style>
 table{
	 margin-top: 150px;
 }
</style>