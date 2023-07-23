import React from 'react';

const AdminQuery = () => {
  const articlesData = [
    {
      id: 1,
      customerID: 456789,
      customer: 'Maria Batumbakal',
      email: 'Example@gmail.com',
      contact: '09123456789',
      query: 'Good day, I am maria and how would i able to order a ticket? I am having a hard time ordering one thanks!',
      status: 'Responded',
    },
    {
      id: 2,
      customerID: 456789,
      customer: 'Juan Dela Cruz',
      email: 'Example@gmail.com',
      contact: '09123456789',
      query: 'Good day, I am Juan Dela Cruz. Is there any way I can retrieve my account password? Thank you very much!',
      status: 'No Reply',
    },
    {
      id: 3,
      customerID: 789123,
      customer: 'Maria Magdalena',
      email: 'Example@gmail.com',
      contact: '09123456789',
      query: 'Good day, I am Maria Magdelana, How may i refund the ticket? I didnt know that the concert would be held on the day of my job Interview im sorry',
      status: 'Responded',
    },
    {
      id: 4,
      customerID: 145365,
      customer: 'Josefina Perez',
      email: 'Example@gmail.com',
      contact: '09123456789',
      query: 'Hello I forgot my password! Is there any way I can retrieve my account? thank you for understanding!',
      status: 'No Reply',
    },
    {
      id: 3,
      customerID: 789123,
      customer: 'Jay Ann L. Garcia',
      email: 'jeyanagarcia@gmail.com',
      contact: '09123456789',
      query: 'Good day, I am Jay Ann L. Garcia, How may i refund the ticket? I didnt know that the concert would be held on the day of my job Interview im sorry',
      status: 'Responded',
    },
    {
      id: 4,
      customerID: 145365,
      customer: 'Jeffrey Canilao',
      email: 'Example@gmail.com',
      contact: '09123456789',
      query: 'Hello I forgot my password! Is there any way I can retrieve my account? thank you for understanding!',
      status: 'No Reply',
    },
    {
      id: 5,
      customerID: 456789,
      customer: 'Maria Batumbakal',
      email: 'Example@gmail.com',
      contact: '09123456789',
      query: 'Good day, I am maria and how would i able to order a ticket? I am having a hard time ordering one thanks!',
      status: 'Responded',
    },
    {
      id: 6,
      customerID: 456789,
      customer: 'Juan Dela Cruz',
      email: 'Example@gmail.com',
      contact: '09123456789',
      query: 'Good day, I am Juan Dela Cruz. Is there any way I can retrieve my account password? Thank you very much!',
      status: 'No Reply',
    },
    {
      id: 7,
      customerID: 789123,
      customer: 'Maria Magdalena',
      email: 'Example@gmail.com',
      contact: '09123456789',
      query: 'Good day, I am Maria Magdelana, How may i refund the ticket? I didnt know that the concert would be held on the day of my job Interview im sorry',
      status: 'Responded',
    },
    {
      id: 8,
      customerID: 145365,
      customer: 'Josefina Perez',
      email: 'Example@gmail.com',
      contact: '09123456789',
      query: 'Hello I forgot my password! Is there any way I can retrieve my account? thank you for understanding!',
      status: 'No Reply',
    },
    {
      id: 9,
      customerID: 789123,
      customer: 'Jay Ann L. Garcia',
      email: 'jeyanagarcia@gmail.com',
      contact: '09123456789',
      query: 'Good day, I am Jay Ann L. Garcia, How may i refund the ticket? I didnt know that the concert would be held on the day of my job Interview im sorry',
      status: 'Responded',
    },
    {
      id: 10,
      customerID: 145365,
      customer: 'Jeffrey Canilao',
      email: 'Example@gmail.com',
      contact: '09123456789',
      query: 'Hello I forgot my password! Is there any way I can retrieve my account? thank you for understanding!',
      status: 'No Reply',
    },
  ];

  return (
    <div className="shadow-md rounded-lg p-4" style={{ borderRadius: '35px' }}>
      <div className="flex justify-between items-center px-60 mt-8">
        <h1>Queries</h1>
        <svg viewBox="0 0 24 24" fill="#525353" width="15px" height="15px" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', left: '12px', top: '9px' }}>
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l4 4 1.49-1.49-4-4zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
        <input type="text" placeholder="Search Queries" style={{ border: 'none', outline: 'none', backgroundColor: '#EDEDED', borderRadius: '25px', paddingLeft: '30px', height: '3rem', width: '250px' }} />
      </div>

      <div className="flex justify-center overflow-y-scroll">
        <table className="w-3/4 mt-4 border rounded mb-8" style={{ borderColor: 'rgba(224, 224, 224, 0.7)' }}>
          <thead style={{ backgroundColor: 'rgba(224, 224, 224, 0.7)' }}>
            <tr style={{ backgroundColor: 'rgba(252, 252, 252)' }}>
              <th className="border-b p-2">Customer ID</th>
              <th className="border-b p-2">Customer</th>
              <th className="border-b p-2">Email</th>
              <th className="border-b p-2">Contact</th>
              <th className="border-b p-2">Query</th>
              <th className="border-b p-2">Status</th>
              <th className="border-b p-2">Action</th>
            </tr>
          </thead>
          <tbody style={{ backgroundColor: 'rgba(252, 252, 252)' }}>
            {articlesData.map((article) => (
              <tr key={article.id} style={{ height: '80px' }}>
                <td className="border-b p-2 text-center">{article.customerID}</td>
                <td className="border-b p-2 text-center" style={{ color: '#00008B' }}>
                  {article.customer}
                </td>
                <td className="border-b p-2 text-center">{article.email}</td>
                <td className="border-b p-2 text-center">{article.contact}</td>
                <td className="border-b p-2 text-center">{article.query}</td>
                <td className="border-b p-2 text-center">
                  <div
                    style={{
                      borderRadius: '10px',
                      padding: '4px 10px',
                      backgroundColor: article.status === 'Responded' ? '#a3f294' : '#f29393',
                      color: article.status === 'Responded' ? '#8c8c8c' : '#000000',
                    }}
                  >
                    {article.status === 'Responded' ? 'Responded' : 'No Reply'}
                  </div>
                </td>
                <td className="border-b p-2 text-center">
                  📩
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminQuery;