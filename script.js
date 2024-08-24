const searchbox =    document.querySelector('.searchbox');
const searchbtn =   document.querySelector('.searchbtn');
 const recipecontainer = document.querySelector('.recipe-container'); 
const   recipedetailscontent  = document.querySelector('.recipedetailscontent')
const recipedetails = document.querySelector(".recipedetails")
const recipeclosebtn = document.querySelector('.recipeclosebtn')






const fetchRecipes= async (query)=>{
    recipecontainer.innerHTML = "<h2 Feching recipes....<h2> "
try {
  
 
    const data = await  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response=await data.json();

      
       recipecontainer.innerHTML = " "
    response.meals.forEach(meal=>{
      //  console.log(meal);
        const recipeDiv= document.createElement('div');
      recipeDiv.classList.add("recipe");
        recipeDiv.innerHTML=`
        <img src = "${meal.strMealThumb}">
<h3> ${meal.strMeal}</h3>
<p><span>${meal.strArea}</span>  Dish</p>
<p> Belongs to <span>${meal.strCategory}</span> category</p>

        `
        const button = document.createElement('button');
        button.textContent= "View recipe";
        recipeDiv.appendChild(button);
        button.addEventListener('click',()=>{
openRecipePopup(meal);
        });
         
        recipecontainer.appendChild(recipeDiv)
    });
  } catch (error) {
    recipecontainer.innerHTML = "<h2> error in Feching recipes....<h2> "

  }
   // console.log(response.meals[0]);
    
}

const fetchIngredients=(meal)=>{
     let ingredientslist  ='';
     for( let i=1;i<=20;i++)
     {
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientslist += `<li>${measure} ${ingredient}</li>`
        }
        else{
            break;
         }
     }
return ingredientslist;
}



const openRecipePopup  = (meal) =>{
recipedetailscontent.innerHTML =
     `<h2 class="recipename">${meal.strMeal}</h2>
     <h3>Ingredents:</h3>
       <ul class="Ingredientlist">${fetchIngredients(meal)}</ul>     
      <div class='recipeinstructions'>
        <h3>Instruction:</h3>
        <p>${meal.strInstruction}</p>
        </div> 
     `

     
     recipedetailscontent.parentElement.style.display = 'block';


}

recipeclosebtn.addEventListener('click',(e)=>{
    recipedetailscontent.parentElement.style.display = 'none';
})



 searchbtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchInput = searchbox.value.trim();
    if(!searchInput){
      recipecontainer.innerHTML= `<h2> type the meal in the search box</h2>`
      return;
    }
    
    
    fetchRecipes(searchInput);
    
 });

