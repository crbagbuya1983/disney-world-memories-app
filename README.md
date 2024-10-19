Disney World Memories App

  This is a simple photo memories app where users can upload photos, add descriptions, and mark them as favorites. The app allows users to view, edit, and delete memories, with the additional ability to filter and paginate through their favorite memories.

**Features**

    **Add Memories:** Upload a photo with a title and description.
  
    **Mark as Favorite:** Toggle a memory as favorite and view all favorites in a dedicated section.
    
    **Edit Memories**: Modify the title and description of any memory.
  
    **Delete Memories**: Remove memories from the gallery.
    
    **Search:** Search for memories by title.
    
    **Pagination:** Memories and favorites are displayed with pagination, showing 6 memories per page.

**Tech Stack**

    **Frontend:** React, Redux Toolkit, Material-UI, Axios
    
    **Backend:** Express.js, MongoDB Atlas, AWS S3 for photo storage
    
    **Deployment:** Frontend on Vercel, Backend on Heroku

**Components Overview**

**Favorites.js**
    Displays all memories marked as favorite with pagination. Users can toggle the favorite status and view details like title and description.

**MemoryForm.js**
    Allows users to upload a photo and add details (title and description) to create a new memory. The form handles image uploads and data submission via Redux actions.

**MemoryItem.js**
    A component that renders individual memory items, including the image, title, description, and action buttons (edit, delete, toggle favorite).

**MemoryList.js**
    Displays a gallery of all memories, supports search functionality to filter by title, and allows pagination through the memory list. Users can edit or delete memories and toggle the favorite status.

**Setup and Installation**

     ** Clone the repository:**
      
        git clone https://github.com/your-username/disney-world-memories-app.git
      
      **Install dependencies:**
      
        cd disney-world-memories-app
        npm install
      
      **Start the frontend development server**:
      
        npm start
      
      **Ensure the backend server is running. You can start the backend server from its folder:**
      
        cd ../photo-backend
      
        npm install
        
        npm start

**API Endpoints**

Make sure to connect the frontend with the backend's API endpoints. The backend API URL is defined in config.js:

GET /api/memories: Fetch all memories

POST /api/memories: Add a new memory

PUT /api/memories/: Edit a memory

DELETE /api/memories/: Delete a memory

PUT /api/memories/
/favorite: Toggle favorite status
