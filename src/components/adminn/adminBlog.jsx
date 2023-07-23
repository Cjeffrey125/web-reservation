import React, { useState } from 'react';
import { BsPencil, BsX } from 'react-icons/bs';

const AdminBlog = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [isEditClicked, setEditClicked] = useState({});
  const [isDeleteClicked, setDeleteClicked] = useState({});

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
    setDeleteClicked((prev) => ({
      ...prev,
      [articleId]: !prev[articleId],
    }));
  };

  const articlesData = [
    {
      id: 1,
      title: 'Get Ready to dance the night away at...',
      organizer: 'BCHATO',
      date: '2023-07-25',
      publishDate: '2023-07-20',
    },
    {
      id: 2,
      title: 'Experience the Rhythm and Energy of...',
      organizer: 'BCHATO',
      date: '2023-08-10',
      publishDate: '2023-08-05',
    },
    {
      id: 3,
      title: 'Get Ready to dance the night away at...',
      organizer: 'BCHATO',
      date: '2023-08-10',
      publishDate: '2023-08-05',
    },
    {
      id: 4,
      title: 'Experience the Rhythm and Energy of...',
      organizer: 'BCHATO',
      date: '2023-08-10',
      publishDate: '2023-08-05',
    },
    {
      id: 5,
      title: 'Get Ready to dance the night away at...',
      organizer: 'BCHATO',
      date: '2023-08-10',
      publishDate: '2023-08-05',
    },
    {
      id: 6,
      title: 'Experience the Rhythm and Energy of...',
      organizer: 'BCHATO',
      date: '2023-08-10',
      publishDate: '2023-08-05',
    },
    {
      id: 7,
      title: 'Get Ready to dance the night away at...',
      organizer: 'BCHATO',
      date: '2023-08-10',
      publishDate: '2023-08-05',
    },
    {
      id: 8,
      title: 'Experience the Rhythm and Energy of...',
      organizer: 'BCHATO',
      date: '2023-08-10',
      publishDate: '2023-08-05',
    },
    {
      id: 9,
      title: 'Experience the Rhythm and Energy of...',
      organizer: 'BCHATO',
      date: '2023-08-10',
      publishDate: '2023-08-05',
    },
    {
      id: 10,
      title: 'Experience the Rhythm and Energy of...',
      organizer: 'BCHATO',
      date: '2023-08-10',
      publishDate: '2023-08-05',
    },
  ];

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
          <button className="px-4 py-2 rounded-md text-white" style={{ backgroundColor: '#525353', color: '#e9e9e8' }}>
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
              <th className="border-b p-2">Organizer</th>
              <th className="border-b p-2">Publish Date</th>
              <th className="border-b p-2">Action</th>
            </tr>
          </thead>
          <tbody style={{ backgroundColor: 'rgba(252, 252, 252)' }}>
            {articlesData.map((article) => (
              <tr key={article.id}>
                <td className="border-b text-center">{article.id}</td>
                <td className="border-b text-center" style={{ color: '#00008B' }}>
                  {article.title}
                </td>
                <td className="border-b text-center">{article.organizer}</td>
                <td className="border-b p-2" style={{ textAlign: 'center' }}>
                  <div style={{ backgroundColor: '#a3f294', color: '#8c8c8c', padding: '0.5rem 1rem', borderRadius: '5px', width: 'fit-content', margin: 'auto' }}>
                    {article.publishDate}
                  </div>
                </td>
                <td className="border-b p-2 text-center">
                  <button
                    className="mr-2"
                    title="Edit"
                    style={{
                      backgroundColor: isEditClicked[article.id] ? '#000101' : 'white',
                      borderRadius: '50%',
                    }}
                    onClick={() => handleEditClick(article.id)}
                  >
                    <BsPencil
                      size={20}
                      color={isEditClicked[article.id] ? '#e9e9e8' : '#525353'}
                    />
                  </button>
                  <button
                    title="Delete"
                    style={{
                      backgroundColor: isDeleteClicked[article.id] ? '#000101' : 'white',
                      borderRadius: '50%',
                    }}
                    onClick={() => handleDeleteClick(article.id)}
                  >
                    <BsX
                      size={20}
                      color={isDeleteClicked[article.id] ? '#e9e9e8' : '#525353'}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminBlog;