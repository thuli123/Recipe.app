let meals = document.getElementById("meals");
let favoriteContainer = document.getElementById("fav-meals");

let searchTerm = document.getElementById("search-term");
let searchBtn = document.getElementById("search");


getRadomMeal(); 
fetchFavMeals();

async function getRadomMeal(){

    let resp =await fetch("https://www.themealdb.com/api/json/v1/1/random.php"

    );
    let respData = await resp.json();
    let randomMeal = respData.meals[0];

 

   addMeal(randomMeal, true); 

}

async function getMealById(id){

    let resp =await fetch(
      
      
      
      "https://www.themealdb.com/api/json/v1/1/lookup.php?i="
    
    
    
    + id
        );

      let respData = await resp.json();
      let meal = respData.meals[0];
  
      return meal;

}
async function getMealsBySearch(term){


     let resp =await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s="
     
     + term
        
    
        
        );


        let respData = await resp.json();
        let meals =  respData.meals;
    

        console.log(meals);

        return meals ;
   


}
function addMeal(mealData, random = false){

  console.log(mealData);

    let meal = document.createElement("div");
    meal.classList.add("meal");

    meal.innerHTML =   `


              

    <div class="meal-header">
    ${random ? `
    <span class="random">
    Random Recipe

</span>` : ''}
       
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
    </div>
    <div class="meal-body">
        
   <h4>${mealData.strMeal}</h4>
   <button class="fav-btn">
       
      <i class="far fa-heart"></i>
   
   </button>
    </div>


   `;
   
   
   let btn = meal.querySelector(".meal-body .fav-btn");
   
   btn.addEventListener("click" , () => {

         if(btn.classList.contains("active"))
         {

            removeMealLS(mealData.idMeal);
            btn.classList.remove("active");
         }
         else{

            addMealLS(mealData.idMeal);
            btn.classList.add("active");


         }
         
        fetchFavMeals();

   });


   meals.appendChild(meal);
}


function addMealLS(mealId){

let mealIds = getMealsLS();

localStorage.setItem('mealIds',JSON.stringify([...mealIds,mealId]));

}


function removeMealLS(mealId){



    let mealIds = getMealsLS();

    localStorage.setItem('mealIds',JSON.stringify(mealIds.filter((id ) => id !==mealId)));



}
 
function getMealsLS(){

let mealIds =JSON.parse(localStorage.getItem
('mealIds'));

return mealIds === null ? [] : mealIds;

}

async function fetchFavMeals(){


  //  clean the container
  favoriteContainer.innerHTML = "";

let mealIds = getMealsLS();

for(let i= 0;i < mealIds.length; i++){

  let mealId = mealIds[i];

  meals = await getMealById(mealId);
  
  addMealFav(meals);
    

}



}
function addMealFav(mealData){

   

    let favMeal = document.createElement("li");
    

    favMeal.innerHTML =   `


              
    <li><img src="${mealData.strMealThumb}" alt="${mealData.strMeal}"><span>${mealData.strMeal}</span></li>
    <button class="clear"><i class="far fa-window-close"></</button>

   `; 
   
   
   let btn = favMeal.querySelector(" .clear");
   
   btn.addEventListener('click',() => {

    removeMealLS(mealData.idMeal);

    fetchFavMeals();

   });

 favoriteContainer.appendChild(favMeal);
  
}
searchBtn.addEventListener("click", async () => {

let search = searchTerm.value;

let meals = await getMealsBySearch(search);


   meals.forEach((meal) => {

       addMeal(meal);


   });


});



