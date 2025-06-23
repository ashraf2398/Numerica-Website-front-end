import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Container from '../../components/ui/Container';
import { publicApi } from '../../utils/api';
import FadeInSection from '../../components/animations/FadeInSection';

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await publicApi.getArticle(id);
        setArticle(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('Failed to load article. Please try again later.');
        setLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="py-20">
        <Container>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20">
        <Container>
          <div className="text-center py-12">
            <div className="inline-flex items-center px-4 py-2 rounded-md bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {error}
            </div>
            <Link 
              to="/articles" 
              className="mt-4 inline-flex items-center text-primary hover:underline"
            >
              <svg className="w-4 h-4 mr-1 transform -rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              Back to Articles
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="py-20">
        <Container>
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Article not found</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">The article you're looking for doesn't exist or has been removed.</p>
            <Link 
              to="/articles" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark transition-colors"
            >
              Browse all articles
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  // Convert newlines to paragraphs
  const contentParagraphs = article.content.split('\n\n').map((paragraph, index) => (
    <p key={index} className="mb-4">
      {paragraph}
    </p>
  ));

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Article Header */}
      <div className="relative bg-gray-50 dark:bg-gray-800 pt-32 pb-20">
        <Container>
          <FadeInSection>
            <div className="max-w-3xl mx-auto text-center">
              <div className="text-sm font-medium text-primary mb-4">
                {formatDate(article.created_at)}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                {article.title}
              </h1>
              <div className="flex items-center justify-center space-x-4">
                <div className="text-gray-600 dark:text-gray-300">
                  By {article.author}
                </div>
              </div>
            </div>
          </FadeInSection>
        </Container>
      </div>

      {/* Article Content */}
      <div className="py-16">
        <Container>
          <div className="max-w-3xl mx-auto">
            <FadeInSection>
              <div className="prose dark:prose-invert max-w-none">
                {contentParagraphs}
              </div>
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <Link 
                  to="/articles" 
                  className="inline-flex items-center text-primary hover:underline"
                >
                  <svg className="w-4 h-4 mr-1 transform -rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  Back to Articles
                </Link>
              </div>
            </FadeInSection>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default ArticleDetail;
