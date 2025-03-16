import supabase from '../supabaseClient';
import React from 'react';
    import './Shop.css';

    const products = [
      {
        name: 'Probiotics',
        description: 'High-quality probiotic supplement to support gut health and digestion.',
        imageUrl: 'https://via.placeholder.com/200', // Placeholder
        affiliateLink:
          'https://example.com/probiotics?utm_source=gutguardianapp&utm_medium=referral&utm_campaign=product_page&utm_content=probiotics',
      },
      {
        name: 'Detox Teas',
        description: 'Blend of natural herbs to help cleanse and detoxify your body.',
        imageUrl: 'https://via.placeholder.com/200', // Placeholder
        affiliateLink:
          'https://example.com/detox-teas?utm_source=gutguardianapp&utm_medium=referral&utm_campaign=product_page&utm_content=detox_teas',
      },
      {
        name: 'Recipe Books',
        description: 'Collection of gut-friendly recipes to inspire healthy eating.',
        imageUrl: 'https://via.placeholder.com/200', // Placeholder
        affiliateLink:
          'https://example.com/recipe-books?utm_source=gutguardianapp&utm_medium=referral&utm_campaign=product_page&utm_content=recipe_books',
      },
    ];
     // Simulated Google Analytics integration
    const simulateGoogleAnalyticsEvent = (eventName, eventParams) => {
      console.log(
        `Simulated Google Analytics event: ${eventName}`,
        eventParams
      );
    };

    function Shop() {
      const handleAffiliateClick = (productName, affiliateLink) => {
        // In a real app, you would send this data to an analytics service (e.g., Google Analytics).
        simulateGoogleAnalyticsEvent('affiliate_link_click', {product_name: productName, affiliate_link: affiliateLink})
        console.log(
          `Simulated click tracked for product: ${productName}. Affiliate Link: ${affiliateLink}`
        );
      };

      return (
        <div>
          <h2>Shop</h2>
          <p>
            <strong>Note:</strong> These are placeholder products and affiliate links. In a real application,
            these would link to actual products on an affiliate network, and clicks would be tracked
            using a server-side analytics service.
          </p>
          <div className="shop-products">
            {products.map((product, index) => (
              <div className="shop-product" key={index}>
                <img src={product.imageUrl} alt={product.name} />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <a
                  href={product.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleAffiliateClick(product.name, product.affiliateLink)}
                >
                  Buy Now
                </a>
              </div>
            ))}
          </div>
        </div>
      );
    }

    export default Shop;
