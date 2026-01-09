import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const QuoteDetails = () => {
  const { id } = useParams();
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/quote/${id}`)
      .then(res => res.json())
      .then(data => {
        setQuote(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (!quote) return <p>Devis introuvable</p>;

  return (
    <div>
      <h2>Devis #{quote.id}</h2>

      <p><strong>Client :</strong> {quote.customer_name}</p>
      <p><strong>Date :</strong> {quote.date}</p>
      <p><strong>Status :</strong> {quote.status}</p>
      <p><strong>Total :</strong> {quote.total} DH</p>
    </div>
  );
};

export default QuoteDetails;
