import { useState, useEffect } from 'react';
import AuthorBanner from '../images/author_banner.jpg';
import AuthorItems from '../components/author/AuthorItems';
import { Link, useParams } from 'react-router-dom';
import AuthorImage from '../images/author_thumbnail.jpg';
import axios from 'axios';

const Author = () => {
  const [loading, setLoading] = useState(true);
  const [author, setAuthor] = useState();
  const { authorId } = useParams();

  useEffect(() => {
    const fetchAuthor = async () => {
      const response = await axios(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
      ).then((response) => response.data);
      setAuthor(response);
      setLoading(false);
    };
    fetchAuthor();
  }, [authorId]);

  const authorObj = {
    authorId: author?.authorId,
    authorImage: author?.authorImage,
  };

  return loading ? null : (
    <div id='wrapper'>
      <div className='no-bottom no-top' id='content'>
        <div id='top'></div>

        <section
          id='profile_banner'
          aria-label='section'
          className='text-light'
          data-bgimage='url(images/author_banner.jpg) top'
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label='section'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-12'>
                <div className='d_profile de-flex'>
                  <div className='de-flex-col'>
                    <div className='profile_avatar'>
                      <img src={author.authorImage} alt='' />

                      <i className='fa fa-check'></i>
                      <div className='profile_name'>
                        <h4>
                          {author.authorName}
                          <span className='profile_username'>
                            @{author.tag}
                          </span>
                          <span id='wallet' className='profile_wallet'>
                            {author.address}
                          </span>
                          <button id='btn_copy' title='Copy Text'>
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className='profile_follow de-flex'>
                    <div className='de-flex-col'>
                      <div className='profile_follower'>
                        {author.followers} followers
                      </div>
                      <Link to='#' className='btn-main'>
                        Follow
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className='col-md-12'>
                <div className='de_tab tab_simple'>
                  <AuthorItems
                    nftCollection={author.nftCollection.map((nft) =>
                      Object.assign(nft, authorObj)
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
