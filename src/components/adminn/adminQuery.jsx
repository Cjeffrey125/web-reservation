import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';
import ReplyModal from './modal/replyModal';

const AdminQuery = () => {
  const [queries, setQueries] = useState([]);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState({});
  const [unrespondedCount, setUnrespondedCount] = useState(0); 

  const fetchQueries = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'queries'));
      const queriesData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setQueries(queriesData);
    } catch (error) {
      console.error('Error fetching queries:', error);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  useEffect(() => {
    const unrespondedQueries = queries.filter((query) => query.status === 'No Reply');
    setUnrespondedCount(unrespondedQueries.length);
  }, [queries]);

  const handleOpenReplyModal = (query) => {
    setSelectedQuery(query);
    setShowReplyModal(true);
  };

  const handleCloseReplyModal = () => {
    setShowReplyModal(false);
  };

  const updateStatus = async (queryId) => {
    try {
      const queryRef = doc(db, 'queries', queryId);
      await updateDoc(queryRef, { status: 'Responded', respondedAt: serverTimestamp() });
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleSend = async (message) => {
    console.log(`Message to: ${selectedQuery.name} (${selectedQuery.email})`);
    console.log('Message content:', message);

 
    const updatedQuery = {
      ...selectedQuery,
      status: 'Responded',
      respondedAt: new Date().toISOString(), 
    };

    await updateStatus(selectedQuery.id);
    setShowReplyModal(false);
    fetchQueries();
  };
  return (
    
    <div className="shadow-md rounded-lg p-4" style={{ borderRadius: '35px' }}>
      <div className="flex justify-center overflow-y-scroll">
        <table className="w-3/4 mt-4 border rounded mb-8" style={{ borderColor: 'rgba(224, 224, 224, 0.7)' }}>
          <thead style={{ backgroundColor: 'rgba(224, 224, 224, 0.7)' }}>
            <tr style={{ backgroundColor: 'rgba(252, 252, 252)' }}>
              <th className="border-b p-2">#</th>
              <th className="border-b p-2">Customer Name</th>
              <th className="border-b p-2">Email</th>
              <th className="border-b p-2">Date Concern Sent</th>
              <th className="border-b p-2">Query</th>
              <th className="border-b p-2">Status</th>
              <th className="border-b p-2">Action</th>
            </tr>
          </thead>
          <tbody style={{ backgroundColor: 'rgba(252, 252, 252)' }}>
            {queries.map((query, index) => (
              <tr key={query.id} style={{ height: '80px' }}>
                <td className="border-b p-2 text-center">{index + 1}</td>
                <td className="border-b p-2 text-center" style={{ color: '#00008B' }}>
                  {query.name}
                </td>
                <td className="border-b p-2 text-center">{query.email}</td>
                <td className="border-b p-2 text-center">{query.dateSent}</td>
                <td className="border-b p-2 text-center">{query.message}</td>
                <td className="border-b p-2 text-center">
                  <div
                    style={{
                      borderRadius: '10px',
                      padding: '4px 10px',
                      backgroundColor: query.status === 'Responded' ? '#a3f294' : '#f29393',
                      color: query.status === 'Responded' ? '#8c8c8c' : '#000000',
                    }}
                  >
                    {query.status === 'Responded' ? 'Responded' : 'No Reply'}
                  </div>
                </td>
                <td className="border-b p-2 text-center">
                  <button onClick={() => handleOpenReplyModal(query)}>📩</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showReplyModal && (
       
        <ReplyModal
          closeModal={handleCloseReplyModal}
          query={selectedQuery} // Pass the entire selectedQuery object
          onSend={handleSend}
        />
      )}

      
    </div>
  );
};

export default AdminQuery;
