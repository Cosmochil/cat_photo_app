/*

*/
let app = document.querySelector(`#app`)
let cat_breed = document.querySelector(`#cat_breed`)
let display = document.querySelector(`#display`)


let cat_ids = [] // cat_ids array is to store the cat.name and cat.id to use later for the reference

/*
get_cat_data() is a function used to get all the cat breeds
and extract their names to display inside the create_cat_list() as our dropdown list in the header
hope my commenting is helpful and explains what is going on here
yes it is
*/
async function get_cat_data() {
    const response = await fetch("https://api.thecatapi.com/v1/breeds?api_key=4d485edd-ee78-4837-add2-26dc4efef64d")
    const cat_data = await response.json()

    // This forEach loop is used to extract the cat name and cat id  from the api and store it in cat_ids array
    // we are going to need this array to compare the name of the cat selected by the user to get the ids related
    // to it to search for individual breed. 
    cat_data.forEach((cat) => cat_ids.push({name: cat.name, id: cat.id}))

    
    create_cat_list(cat_data) 
}

function create_cat_list(data){
    cat_breed.innerHTML = `
        <select onchange="load_by_breed(this.value)" class="select_cat">
            <option>Choose a cat breed</option>
            ${data.map(breed => `<option>${breed.name}</option>`).join('')}
        </select>
    `;
} 

/*
Load_by_breed(cat_name) accepts the individual cat breed name selected by the user
in the select drop down list and passes the argument to the new URL to fetch the individual cat
we loop over the cat_ids to check the name of the cat selected by the user and if it is true then 
fetch the cat by ID. 

*/
async function load_by_breed(cat_name){
    // Loop over the cat_ids array
    for(let cat_id of cat_ids) {
        // if the name in the cat_id array is equal to the user selection
        if(cat_id.name === cat_name) {
            // supply the cat.id related to the cat.name from the array of cat_ids to the following URL
            const response = await fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${cat_id.id}`);
            const cat_info = await response.json();

            let cat_details = cat_info[0]
            let cat_path = cat_details.breeds[0]


            // The cat information needed for the Display
            let cat_image = cat_details.url
            let cat_name = cat_path.name
            let cat_description = cat_path.description
            let cat_adaptability = cat_path.adaptability
            let cat_affection = cat_path.affection_level
            let cat_grooming = cat_path.grooming
            let cat_intelligence = cat_path.intelligence
            let cat_stranger = cat_path.stranger_friendly
            let cat_child = cat_path.child_friendly
            let cat_dog = cat_path.dog_friendly
            let cat_energy = cat_path.energy_level
            let cat_health = cat_path.health_issue
            let cat_shedding = cat_path.shedding_level
            let cat_social = cat_path.social_needs
            let cat_vocalisation = cat_path.vocalisation
            let cat_nature = cat_path.temperament

            // Below is the display template to show the information on the webpage 
    
            display.innerHTML = `
            <main>
            <header class="display__title">
                <h1>${cat_name}</h1>
            </header>
                <figure class="display__figure">
                    <img class="cat_image" src="${cat_image}">
                    <figcaption class ="cat_description">${cat_description}</figcaption>
                </figure>
                <section class="cat_nature">
                    <h2>Cat Nature</h2>
                    <ul>
                        ${`<li>${cat_nature.split(",")}</li>`}
                    </ul>
                </section>
                <section class="cat_stats">
                    <h2>Cat Characteristics</h2>
                    <p>
                        <label for="adaptability">Adaptability</label>
                        <meter id="adaptability" min="0" max="5" value="${cat_adaptability}"></meter>
                    </p>
                    <p>
                        <label for="affection">Affection</label>
                        <meter id="affection" min="0" max="5" value="${cat_affection}"></meter>  
                    </p>
                    <p>
                        <label for="child_friendly">Child Friendly</label>
                        <meter id="child_friendly" min="0" max="5" value="${cat_child}"></meter>  
                    </p>
                    <p>
                        <label for="dog_friendly">Dog Friendly</label>
                        <meter id="dog_friendly" min="0" max="5" value="${cat_dog}"></meter>  
                    </p>
                    <p>
                        <label for="energy">Energy Level</label>
                        <meter id="energy" min="0" max="5" value="${cat_energy}"></meter>  
                    </p>
                    <p>
                        <label for="grooming">Grooming</label>
                        <meter id="grooming" min="0" max="5" value="${cat_grooming}"></meter>  
                    </p>
                        <p>
                        <label for="health">Health Issues</label>
                        <meter id="health" min="0" max="5" value="${cat_health}"></meter>  
                    </p>
                    <p>
                        <label for="intelligence">Intelligence</label>
                        <meter id="intelligence" min="0" max="5" value="${cat_intelligence}"></meter>  
                    </p>
                    <p>
                        <label for="shedding">Shedding Level</label>
                        <meter id="shedding" min="0" max="5" value="${cat_shedding}"></meter>  
                    </p>
                    <p>
                        <label for="social">Social Needs</label>
                        <meter id="social" min="0" max="5" value="${cat_social}"></meter>  
                    </p>
                    <p>
                        <label for="stranger_friendly">Stranger Friendly</label>
                        <meter id="stranger_friendly" min="0" max="5" value="${cat_stranger}"></meter>  
                    </p>
                    <p>
                        <label for="vocalisation">Vocalisation</label>
                        <meter id="vocalisation" min="0" max="5" value="${cat_vocalisation}"></meter>  
                    </p>
                    
                </section>
            </main>
            `;
        }
    }

}

get_cat_data()


/*
Lets go at the top
*/

