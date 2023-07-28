import React, { useState, useEffect } from 'react';
import { BsPencil, BsX } from 'react-icons/bs';
import CreateArticle from './modal/createArticle';
import { collection, addDoc, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import ConfirmationModal from './modal/confirmationModal';
import ArticleModal from './modal/articleModal';

const AdminBlog = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [isEditClicked, setEditClicked] = useState({});
  const [isDeleteClicked, setDeleteClicked] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [blogData, setBlogData] = useState([]);
  const [articleToDelete, setArticleToDelete] = useState(null);
  const [isArticleModalOpen, setArticleModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  
  const [currentImageURL, setCurrentImageURL] = useState(null);

  const handleOpenArticleModal = (articleData) => {
    if (articleData) {
  
      setSelectedArticle(articleData);
      setCurrentImageURL(articleData.src || '');
    } else {
    
      setSelectedArticle(null);
      setCurrentImageURL(''); 
    }
    setArticleModalOpen(true);
  };

  
  const handleCloseArticleModal = () => {
    setSelectedArticle(null);
    setArticleModalOpen(false);
  };


  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveArticle = async (articleData) => {
    try {
      
      console.log('Article data to be saved:', articleData);
    } catch (error) {
      console.error('Error saving article data:', error);
    }
  };

  useEffect(() => {
   
    const fetchArticles = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'articles'));
        const articles = querySnapshot.docs.map((doc) => doc.data());
        setBlogData(articles);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
    fetchArticles();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleEditClick = (articleId) => {
    setEditClicked((prev) => ({
      ...prev,
      [articleId]: !prev[articleId],
    }));
  };

  
  const handleDeleteClick = (articleId) => {
    setArticleToDelete(articleId); 
  };
  
  const handleConfirmDelete = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'articles'));
      const documentIdToDelete = querySnapshot.docs.find((doc) => doc.data().ID === articleToDelete)?.id;
  
      if (documentIdToDelete) {
        await deleteDoc(doc(db, 'articles', documentIdToDelete));
        setBlogData((prevBlogData) =>
          prevBlogData.filter((article) => article.ID !== articleToDelete)
        );

        setArticleToDelete(null); 
      } else {
        console.warn('Article not found with the specified ID:', articleToDelete);
      }
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };
  const handleImageChange = (imageFile, newImageURL) => {
    // Update the image data in the selectedArticle state when the user uploads a new image
    setSelectedArticle((prevSelectedArticle) => ({
      ...prevSelectedArticle,
      src: newImageURL,
    }));
    setCurrentImageURL(newImageURL); // Update the currentImageURL in the AdminBlog state
  };
  const updateArticleImage = (articleId, newImageURL) => {
    setBlogData((prevBlogData) =>
      prevBlogData.map((article) =>
        article.ID === articleId ? { ...article, src: newImageURL } : article
      )
    );
  };


  return (
    <div>
    <div className="flex justify-between items-center px-60 mt-8">
      <h1>Articles Created</h1>
      <div className="flex items-center" style={{ margin: '0 10px', position: 'relative' }}>
        <svg viewBox="0 0 24 24" fill="#525353" width="15px" height="15px" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', left: '12px', top: '9px' }}>
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l4 4 1.49-1.49-4-4zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
        <input type="text" placeholder="Search Articles" style={{ border: 'none', outline: 'none', backgroundColor: '#EDEDED', borderRadius: '25px', paddingLeft: '30px', height: '3rem', width: '250px' }} />
        <button
          className="px-4 py-2 rounded-md text-white"
          style={{ backgroundColor: '#525353', color: '#e9e9e8' }}
          onClick={handleOpenModal}
        >
          + Create Article
        </button>
      </div>
    </div>

      <div className="flex justify-center overflow-y-scroll">
        <table className="w-3/4 mt-4 border rounded mb-8 shadow-md" style={{ borderColor: 'rgba(224, 224, 224, 0.7)' }}>
          <thead style={{ backgroundColor: 'rgba(224, 224, 224, 0.7)' }}>
            <tr>
              <th className="p-2" colSpan="7" style={{ backgroundColor: 'rgba(224, 224, 224, 0.7)' }}>
                <ul className="flex border-b">
                  <li className={`cursor-pointer py-2 px-4 ${activeTab === 'published' ? 'bg-black text-white' : ''}`} onClick={() => handleTabChange('published')}>
                    Published
                  </li>
                  <li className={`cursor-pointer py-2 px-4 ${activeTab === 'draft' ? 'bg-black text-white' : ''}`} onClick={() => handleTabChange('draft')}>
                    Draft
                  </li>
                </ul>
              </th>
            </tr>

            <tr style={{ backgroundColor: 'rgba(252, 252, 252)' }}>
              <th className="border-b p-2">#</th>
              <th className="border-b p-2">Article Title</th>
              <th className="border-b p-2">Article By</th>
              <th className="border-b p-2">Publish Date</th>
              <th className="border-b p-2">Action</th>
            </tr>
          </thead>
          <tbody style={{ backgroundColor: 'rgba(252, 252, 252)' }}>
            {blogData.map((article) => (
              <tr key={article.ID}>
                <td className="border-b text-center">{article.ID}</td>
                <td className="border-b text-center" style={{ color: '#00008B' }}>
                  {article.title}
                </td>
                <td className="border-b text-center">{article.organization}</td>
                <td className="border-b p-2" style={{ textAlign: 'center' }}>
                  <div style={{ backgroundColor: '#a3f294', color: '#8c8c8c', padding: '0.5rem 1rem', borderRadius: '5px', width: 'fit-content', margin: 'auto' }}>
                    {article.date}
                  </div>
                </td>
                <td className="border-b p-2 text-center">
                <button
                    className="mr-2"
                    title="Edit"
                    style={{
                      backgroundColor: isEditClicked[article.ID] ? '#000101' : 'white',
                      borderRadius: '50%',
                    }}
                    onClick={() => handleOpenArticleModal(article)} 
                  >
                    <BsPencil
                      size={20}
                      color={isEditClicked[article.ID] ? '#e9e9e8' : '#525353'}
                    />
                  </button>

                  <button
                    title="Delete"
                    style={{
                      backgroundColor: isDeleteClicked[article.ID] ? '#000101' : 'white',
                      borderRadius: '50%',
                    }}
                    onClick={() => handleDeleteClick(article.ID)}
                  >
                    <BsX
                      size={20}
                      color={isDeleteClicked[article.ID] ? '#e9e9e8' : '#525353'}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {showModal && (
        <CreateArticle show={showModal} onClose={handleCloseModal} onSaveArticle={handleSaveArticle} />
      )}

      {selectedArticle && (
        <ArticleModal
          articleId={selectedArticle.id}
          title={selectedArticle.title}
          des={selectedArticle.description}
          imagePath={selectedArticle.imagePath}
          date={selectedArticle.date}
          org={selectedArticle.organization}
          onClose={handleCloseArticleModal} 
          isOpen={isArticleModalOpen} 
          onImageChange={(imageFile, newImageURL) => {
            handleImageChange(imageFile, newImageURL); 
            updateArticleImage(selectedArticle.id, newImageURL); 
          }} 
          
        />
      )}
      
      {articleToDelete && (
      <ConfirmationModal
        closeModal={() => setArticleToDelete(null)}
        openModal={!!articleToDelete}
        onConfirmDelete={handleConfirmDelete}
      />
      )}

    </div>
  );
};

export default AdminBlog;






