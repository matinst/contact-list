import { useEffect, useState } from 'react';
import useFetch from 'react-fetch-hook'
import './App.css';
import ContactCards from './Components/ContactCards'
import 'tw-elements'
function App() {

  const url = 'https://randomuser.me/api'
  const { isLoading , data , error } = useFetch(url+'?results=200')
  const [contactList, setContactList] = useState(null)
  const [filterQuery , setFilterQuerty ] = useState(null)

  useEffect(()=> {
    if (filterQuery) {
      const queryString = filterQuery.toLowerCase()
      const filteredData = data?.results?.filter(contact => {
        const fullName = `${contact.name.first} ${contact.name.last}`

        if (queryString.length === 1) {
          const firstLetter = fullName.charAt(0).toLowerCase()
          return firstLetter === queryString
        }else {
          return fullName.toLowerCase().includes(queryString)
        }
      })
      setContactList(filteredData)
    }
    else {
      setContactList(data?.results)
    }
  },[data,filterQuery])


  return (
    <div className="bg-gray-100">
      <section>
        <form>
          <input 
            type="text"
            onChange={event => setFilterQuerty(event.target.value)}
            className="ml-20 mt-6 rounded-md p-2"
            placeholder="Search Contact ..."
          />
        </form>
      </section>
      {isLoading && (
          <div className='text-center mt-10'>
            <div className="
                spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0
                  text-yellow-500
                " role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

      <section className='p-20 grid sm:grid-cols-2 md:grid-cols-4 gap-6'>
        {contactList?.length < 1 && (
          <h1>No data matches your search</h1>
        )}
        
        <ContactCards contactList={contactList}/>
      </section>
    </div>
  )
}

export default App;
