return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'visible' : 'hidden'}`}>
      <div className="fixed inset-0 z-40 backdrop-filter backdrop-blur-sm bg-opacity-30 flex items-center justify-center">
        <div className="payment-container h-[80%] max-h-[80%] w-[50%] border-2 rounded-lg border-gray-500 flex flex-col bg-white p-12 rounded-lg shadow-md relative overflow-y-auto">
          <button
            className="absolute top-0 right-0 m-3 p-2 border-b-gray-500 text-black hover:text-gray-700 hover:bg-red-500 bg-transparent"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
  
          {/* Edit Event Section */}
          <div className="flex flex-row items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Edit Event</h1>
            {isEditMode ? (
              <button className='w-10' onClick={handleSaveClick}>
                <FontAwesomeIcon icon={faSave} className="text-black text-1xl" />
              </button>
            ) : (
              <button className='w-10' onClick={handleEditClick}>
                <BsPencil className="text-black text-1xl" />
              </button>
            )}
          </div>
  
          {/* First Section */}
          <section>
            <div className="container mx-auto min-h-[300px] mb-14">
              <div className="flex flex-wrap justify-left lg:flex-nowrap">
                <div className="container mx-auto mt-5 flex flex-wrap justify-left md:flex-nowrap">
                  <div className="w-full md:w-80 h-auto bg-gray-300 rounded-lg overflow-hidden mb-6 md:mb-0 md:mr-6 ml-10">
                    {isEditMode ? (
                      <EventImageUploader
                        onImageChange={(imageFile, newImageURL) => {
                          handleNewImageChange(imageFile, newImageURL);
                        }}
                        imageURL={newImageURL || currentImageURL} 
                      />
                    ) : (
                      <img
                        className="w-full h-full object-cover"
                        src={currentImageURL}
                        alt="Event Image"
                      />
                    )}
                  </div>
  
                  <div className="p-6 flex flex-col justify-left">
                    {isEditMode ? (
                      <input
                        className="ml-12 text-base uppercase text-designColor font-normal border-gray-500 flex-1"
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                      />
                    ) : (
                      <h1 className="text-4xl font-bold text-[#142c0c]">{editedTitle}</h1>
                    )}
  
                    <div className="flex items-center mt-2">
                      <FontAwesomeIcon icon={faLocationDot} className="mr-2" />
                      {isEditMode ? (
                        <input
                          className="ml-12 text-base uppercase text-designColor font-normal border-gray-500 flex-1"
                          type="text"
                          value={editedLocation}
                          onChange={(e) => setEditedLocation(e.target.value)}
                        />
                      ) : (
                        <span>{editedLocation}</span>
                      )}
                    </div>
  
                 
              {isEditMode ? (
                <div>
                    <BirthdaySelector
                    selectedDay={selectedDay}
                    setSelectedDay={setSelectedDay}
                    selectedMonth={selectedMonth}
                    setSelectedMonth={setSelectedMonth}
                    selectedYear={selectedYear}
                    setSelectedYear={setSelectedYear}
                    />
                    <input
                    className="ml-12 text-base uppercase text-designColor font-normal border-gray-500 flex-1"
                    type="time"
                    value={editedTime}
                    onChange={(e) => setEditedTime(e.target.value)}
                    />
                </div>
                ) : (
                <p className="mt-2">{editedDate} | {editedTime}</p>
                )}
            


              <div className="flex gap-3 mt-4">
              {isEditMode ? (
                <input
                  className="ml-12 text-base uppercase text-designColor font-normal border-gray-500 flex-1"
                  type="text"
                  value={editedGenre1}
                  onChange={(e) => setEditedGenre1(e.target.value)}
                />
              ) : (
                <div className="text-xs px-2 py-1 rounded-full border border-black">
                  {editedGenre1}
                </div>
              )}

                {isEditMode ? (
                <input
                  className="ml-12 text-base uppercase text-designColor font-normal border-gray-500 flex-1"
                  type="text"
                  value={editedGenre2}
                  onChange={(e) => setEditedGenre2(e.target.value)}
                />
              ) : (
                <div className="text-xs px-2 py-1 rounded-full border border-black">
                  {editedGenre2}
                </div>
                )}
              </div>


              <div className="flex gap-32 mt-4">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                  {isEditMode ? (
                <input
                  className="ml-12 text-base uppercase text-designColor font-normal border-gray-500 flex-1"
                  type="text"
                  value={editedOrganization}
                  onChange={(e) => setEditedOrganization(e.target.value)}
                />
              ) : (
                  <span>{editedOrganization}</span>
                )}
                </div>


                <div className="flex items-center">
                  <FontAwesomeIcon icon={faUserGroup} className="mr-2" />
                  {isEditMode ? (
                <input
                  className="ml-12 text-base uppercase text-designColor font-normal border-gray-500 flex-1"
                  type="text"
                  value={editedLimit}
                  onChange={(e) => setEditedLimit(e.target.value)}
                />
              ) : (
                  <span>{editedLimit}</span>
                  )}
                </div>
              </div>  
              
              <div className='mt-4'>
              {isEditMode ? (
                <input
                  className="ml-12 text-base uppercase text-designColor font-normal border-gray-500 flex-1"
                  type="text"
                  value={editedPrice}
                  onChange={(e) => setEditedPrice(e.target.value)}
                />
              ) : (
                <span>Ticket Price: {editedPrice}</span>
                )}
              </div>

              <div className="flex justify-left mt-5">
                    <button
                      className="w-40 h-10 rounded-full shadow-shadowOne flex items-center justify-center 
                      bg-gradient-to-r from-bodyColor to-[#73d081] group hover:bg-gradient-to-b hover:from-green-200 hover:to-green-300 
                      transition-colors duration-1000 mx-auto text-black mr-4"      
                    >
                      Book Now
                    </button>
                    <button
                      className="w-40 h-10 rounded-full shadow-shadowOne flex items-center justify-center 
                      bg-gradient-to-r from-bodyColor to-[#73d081] group hover:bg-gradient-to-b hover:from-green-200 hover:to-green-300 
                      transition-colors duration-1000 mx-auto text-black mr-4"
                    >
                      Wishlist
                    </button>
              
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>
  
          {/* Second Section */}
          <section>
            <div className="container mx-auto">
              <div className="container mx-auto min-w-[400px]">
                <div className="container relative p-6 justify-center">
                  <h1 className="text-2xl font-bold text-[#142c0c]">About The Event</h1>
                  <div className="bg-gray-300 rounded-lg p-6">
                    {isEditMode ? (
                      <textarea
                        className="ml-12 text-base w-[80%] uppercase text-designColor font-normal border-b border-gray-500 flex-1"
                        rows={4}
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                      />
                    ) : (
                      <p className="text-justify">{editedDescription}</p>
                    )}
                  </div>
                </div>
  
                <div className="container relative p-6 justify-center">
                  <h1 className="text-2xl font-bold text-[#142c0c]">Hosts</h1>
                  <div className="bg-gray-300 rounded-lg p-6">
                    {isEditMode ? (
                      <textarea
                        className="ml-12 text-base w-[80%] uppercase text-designColor font-normal border-b border-gray-500 flex-1"
                        value={editedHost}
                        type="text"
                        onChange={(e) => setEditedHost(e.target.value)}
                      />
                    ) : (
                      <p className="text-justify">{editedHost}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
          
        </div>
      </div>
    </div>
  );