{item.title}
                  <button style={{ margin: " 0 0 0 40px" }} ref = {journalID} 
                  value={item._id}
                  onClick={handleDelete} > Delete</button>
                  <form>
                    <label>Title</label><br></br>
                    <input 
                    placeholder={item.title}
                    name="title"
                    defaultValue={item.title}
                    onChange={editHandler}/><br></br>
                    <label>Description</label><br></br>
                    <input 
                    placeholder={item.description}
                    name="description"
                    defaultValue={item.description}
                    onChange={editHandler}/>
                    <br></br>
                  </form>
                  <button style={{ margin: " 0 0 0 40px" }} ref = {journalID} 
                  value={item._id}
                  onClick={handleEdit} > Edit</button>