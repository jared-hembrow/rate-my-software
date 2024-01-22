import ProjectCardList from '@/components/Projects/ProjectCardList'
import React from 'react'

type Props = {}
const testList = [
  {
    id: "fb913u",
    name: "Task Tracker Web App",
    description: "Create a web application that allows users to track and manage their daily tasks. The application should provide a user-friendly interface where users can add, edit, and delete tasks. Tasks can have due dates, priorities, and categories. Users should be able to mark tasks as completed and view their task history. The app should also include features such as user authentication, so each user has a personalized task list. Additionally, implement a notification system to remind users of upcoming deadlines. Use modern web technologies, such as React for the frontend and Node.js for the backend, and employ a database to store user data and task information. The goal is to create a seamless and efficient task management system to help users stay organized and productive.", 
    author: "Jared Adam Hembrow",
    rating: 75,
    numberOfReviews: 72
  },
  {
    id: "gu2gf1",
    name: "Task Tracker Web App",
    description: "Develop a web application that suggests recipes based on user preferences. Users can input dietary restrictions, cuisine preferences, and available ingredients. The application fetches and displays recipes from an external API, considering user inputs. It also includes features for saving favorite recipes, creating shopping lists, and rating dishes. The tech stack involves React for the frontend, a Node.js backend, and integration with a recipe API. The aim is to streamline the recipe discovery process and enhance user cooking experiences.", 
    author: "Jared Adam Hembrow",
    rating: 25,
    numberOfReviews: 5
  },
  {
    id: "fb2nfa",
    name: "Task Tracker Web App",
    description: "Create a web application that allows users to track and manage their daily tasks. The application should provide a user-friendly interface where users can add, edit, and delete tasks. Tasks can have due dates, priorities, and categories. Users should be able to mark tasks as completed and view their task history. The app should also include features such as user authentication, so each user has a personalized task list. Additionally, implement a notification system to remind users of upcoming deadlines. Use modern web technologies, such as React for the frontend and Node.js for the backend, and employ a database to store user data and task information. The goal is to create a seamless and efficient task management system to help users stay organized and productive.", 
    author: "Jared Adam Hembrow",
    rating: null,
    numberOfReviews: 0
  },
  
]
const page = (props: Props) => {
  return (
    <div className='container p-5' style={{
      // backgroundColor: "var(--midnight-blue)",
       borderRadius: "5px", marginTop: "25px", minHeight: "87vh"}}>
      <ProjectCardList list={testList} />
    </div>
  )
}

export default page