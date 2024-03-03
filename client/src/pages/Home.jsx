import React from 'react'
import {
  ModalHeader,
  ModalDescription,
  ModalContent,
  ModalActions,
  Button,
  Header,
  Image,
  Modal,
  Form,
  FormGroup,
  FormField,
  FormInput,
  FormTextArea,
  Grid,
  GridColumn,
  Search
} from 'semantic-ui-react'
import { useState, useEffect } from 'react';


const Home = () => {
  const [allRecipeList, setAllRecipeList] = useState([]);
  const [open, setOpen] = useState(false)
  
  const getList = async () => {
    try{
      const res = await fetch('/api/recipe/filter', {
        method: 'GET',
        headers: {
          'Content-Type':'application/json'
        },
        body : JSON.stringify()
      })
      const data = await res.json();
      console.log(data)
      setAllRecipeList(data);
    } catch (error) {
      console.log(error)
    } 
  }
  useEffect(() => {
    getList();
    console.log(allRecipeList)
    
  }, [])
  const recipeList = [{"name": "a",rating:4,cookingTime:4}]
  return (
    <div class="bg-white py-24 sm:py-32">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="lg:flex lg:items-center lg:justify-between">
          <div class="min-w-0 flex-1">
            <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Cooking made simple!!</h2>
            <p class="mt-2 text-lg leading-8 text-gray-600">Check out these recipe!</p>
          </div>
          <Grid>
        <GridColumn width={6}>
          <Search
            input={{ icon: 'search', iconPosition: 'left' }}
           
          />
        </GridColumn>
        
      </Grid>
        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          trigger={<Button className="bg-green-700">Add recipe</Button>}
        >
          <ModalHeader>Add a recipe</ModalHeader>
          <ModalContent>
            <ModalDescription>
    
              <p>
                Share your secret recipe with us..
              </p>
              
            </ModalDescription>
          </ModalContent>
          <ModalActions>
              <Form>
            <FormGroup widths='equal'>
              <FormInput fluid label='Recipe name' placeholder='Recipe name' />
              <FormInput fluid label='Time needed to cooke' placeholder="Time needed" />
            </FormGroup>
            <FormTextArea label='Ingredients' placeholder='What do I need?' />
            <FormTextArea label='Instructions' placeholder='Teach me how to do!' />
                <Button color='black' onClick={() => setOpen(false)}>
              Nope, not today
            </Button>
            <Button
              content="Submit"
              labelPosition='right'
              icon='checkmark'
              onClick={() => setOpen(false)}
              positive
            />
            </Form>
          </ModalActions>
        </Modal>

        </div>
        { recipeList.map(recipe => {
        <div class="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <article class="flex max-w-xl flex-col items-start justify-between">
            <div class="flex items-center gap-x-4 text-xs">
              <time datetime="2020-03-16" class="text-gray-500">Rating: {recipe.rating}</time>
              <a href="#" class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">Marketing</a>
            </div>
            <div class="group relative">
              <h3 class="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                <a href="#">
                  <span class="absolute inset-0"></span>
                  {recipe.name}
                </a>
              </h3>
              <p class="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.</p>
            </div>
            <div class="relative mt-8 flex items-center gap-x-4">
              <div class="text-sm leading-6">
                <p class="font-semibold text-gray-900">
                  <a href="#">
                    <span class="absolute inset-0"></span>
                   {recipe.cookingTime}
                  </a>
                </p>
                <p class="text-gray-600">Co-Founder / CTO</p>
              </div>
            </div>
          </article> 
        </div> })}

    </div>
    
  </div>

  )
}

export default Home