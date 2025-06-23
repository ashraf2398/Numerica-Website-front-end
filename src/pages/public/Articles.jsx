import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from '../../components/ui/Container';
import Card from '../../components/ui/Card';
import { publicApi } from '../../utils/api';

// Dummy data for articles
const dummyArticles = [
  {
    id: 1,
    title: 'The Future of Web Development in 2025',
    excerpt: 'Exploring the latest trends and technologies that will shape web development in the coming year.',
    category: 'Web Development',
    date: 'June 15, 2025',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    author: {
      name: 'Sarah Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    }
  },
  {
    id: 2,
    title: 'Mastering React Hooks: A Comprehensive Guide',
    excerpt: 'Learn how to use React Hooks to write cleaner and more efficient React components.',
    category: 'React',
    date: 'June 10, 2025',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    author: {
      name: 'Michael Chen',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    }
  },
  {
    id: 3,
    title: 'The Rise of AI in Modern Applications',
    excerpt: 'How artificial intelligence is transforming the way we build and interact with applications.',
    category: 'AI & ML',
    date: 'June 5, 2025',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    author: {
      name: 'David Kim',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg'
    }
  },
  {
    id: 4,
    title: 'Building Scalable Microservices with Node.js',
    excerpt: 'Best practices and patterns for building scalable microservices using Node.js.',
    category: 'Backend',
    date: 'May 28, 2025',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    author: {
      name: 'Emma Davis',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
    }
  },
  {
    id: 5,
    title: 'The Complete Guide to CSS Grid',
    excerpt: 'Master CSS Grid with this comprehensive guide to modern layout techniques.',
    category: 'CSS',
    date: 'May 20, 2025',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    author: {
      name: 'Alex Turner',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
    }
  },
  {
    id: 6,
    title: 'Getting Started with GraphQL',
    excerpt: 'A beginner\'s guide to building APIs with GraphQL and Node.js.',
    category: 'API',
    date: 'May 15, 2025',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    author: {
      name: 'Jessica Lee',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg'
    }
  }
];

// Categories for filtering
const categories = [
  'All',
  'Web Development',
  'React',
  'AI & ML',
  'Backend',
  'CSS',
  'API'
];

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // In a real app, you would fetch articles from your API
        // const response = await publicApi.getArticles();
        // setArticles(response.data);
        
        // For now, use dummy data
        setArticles(dummyArticles);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError('Failed to load articles. Please try again later.');
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Filter articles based on category and search query
  const filteredArticles = articles.filter(article => {
    const matchesCategory = activeCategory === 'All' || article.category === activeCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-16">
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
      <div className="min-h-screen pt-32 pb-16">
        <Container>
          <Card className="p-8 text-center">
            <svg className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Oops! Something went wrong</h2>
            <p className="text-gray-600">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              Try Again
            </button>
          </Card>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-16 md:py-24 mb-12">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Latest Articles & Insights</h1>
            <p className="text-xl opacity-90">Stay updated with the latest trends, tutorials, and news in technology and development.</p>
            
            {/* Search Bar */}
            <div className="mt-8 max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full px-6 py-4 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <svg 
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Container>
        {/* Category Filter */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  activeCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center">
            <svg className="h-16 w-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No articles found</h3>
            <p className="text-gray-600">Try adjusting your search or filter to find what you're looking for.</p>
          </Card>
        )}

        {/* Load More Button */}
        {filteredArticles.length > 0 && (
          <div className="mt-12 text-center">
            <button className="px-6 py-3 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors">
              Load More Articles
            </button>
          </div>
        )}
      </Container>
    </div>
  );
};

// Article Card Component
const ArticleCard = ({ article }) => {
  return (
    <Link 
      to={`/articles/${article.id}`} 
      className="group block h-full"
    >
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-t-lg">
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-3">
            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
              {article.category}
            </span>
            <span className="text-sm text-gray-500">{article.readTime}</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2">
            {article.excerpt}
          </p>
          <div className="flex items-center mt-4 pt-4 border-t border-gray-100">
            <img 
              src={article.author.avatar} 
              alt={article.author.name}
              className="h-10 w-10 rounded-full object-cover mr-3"
            />
            <div>
              <p className="text-sm font-medium text-gray-800">{article.author.name}</p>
              <p className="text-xs text-gray-500">{article.date}</p>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default Articles;
