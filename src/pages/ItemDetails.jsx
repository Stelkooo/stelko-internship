import React, { useEffect, useState } from 'react';
import EthImage from '../images/ethereum.svg';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Skeleton from '../components/UI/Skeleton';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ItemDetails = () => {
  const { itemId } = useParams();
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchItem = async () => {
      const response = await axios(
        `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${itemId}`
      ).then((response) => response.data);
      setItem(response);
      setLoading(false);
    };
    fetchItem();
  }, [itemId]);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div id='wrapper'>
      <div className='no-bottom no-top' id='content'>
        <div id='top'></div>
        <section aria-label='section' className='mt90 sm-mt-0'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-6 text-center'>
                {loading ? (
                  <Skeleton
                    height={'100%'}
                    width={'100%'}
                    borderRadius={'3px'}
                  />
                ) : (
                  <img
                    src={item.nftImage}
                    className='img-fluid img-rounded mb-sm-30 nft-image'
                    alt=''
                    data-aos='fade-up'
                  />
                )}
              </div>
              <div className='col-md-6'>
                <div className='item_info'>
                  {loading ? (
                    <Skeleton height={'2.5rem'} width={'20rem'} />
                  ) : (
                    <h2 data-aos='fade-up'>
                      {item.title} #{item.tag}
                    </h2>
                  )}
                  <div className='item_info_counts'>
                    {loading ? (
                      <Skeleton
                        height={'30px'}
                        width={'80px'}
                        borderRadius={'3px'}
                      />
                    ) : (
                      <div className='item_info_views' data-aos='fade-up'>
                        <i className='fa fa-eye'></i>
                        100
                      </div>
                    )}
                    {loading ? (
                      <Skeleton
                        height={'30px'}
                        width={'80px'}
                        borderRadius={'3px'}
                      />
                    ) : (
                      <div className='item_info_like' data-aos='fade-up'>
                        <i className='fa fa-heart'></i>
                        74
                      </div>
                    )}
                  </div>
                  {loading ? (
                    <Skeleton height={'80px'} width={'100%'} />
                  ) : (
                    <p data-aos='fade-up'>{item.description}</p>
                  )}
                  <div className='d-flex flex-row'>
                    <div className='mr40'>
                      <h6>Owner</h6>
                      <div className='item_author'>
                        <div className='author_list_pp'>
                          {loading ? (
                            <Skeleton
                              height={'50px'}
                              width={'50px'}
                              borderRadius={'50%'}
                            />
                          ) : (
                            <Link to={`/author/${item.ownerId}`}>
                              <img
                                className='lazy'
                                src={item.ownerImage}
                                alt=''
                                data-aos='fade-up'
                              />
                              <i className='fa fa-check' data-aos='fade-up'></i>
                            </Link>
                          )}
                        </div>
                        <div className='author_list_info'>
                          {loading ? (
                            <Skeleton height={'1rem'} width={'5rem'} />
                          ) : (
                            <Link
                              to={`/author/${item.ownerId}`}
                              data-aos='fade-up'
                            >
                              {item.ownerName}
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className='de_tab tab_simple'>
                    <div className='de_tab_content'>
                      <h6>Creator</h6>
                      <div className='item_author'>
                        <div className='author_list_pp'>
                          {loading ? (
                            <Skeleton
                              height={'50px'}
                              width={'50px'}
                              borderRadius={'50%'}
                            />
                          ) : (
                            <Link to={`/author/${item.creatorId}`}>
                              <img
                                className='lazy'
                                src={item.creatorImage}
                                alt=''
                                data-aos='fade-up'
                              />
                              <i className='fa fa-check' data-aos='fade-up'></i>
                            </Link>
                          )}
                        </div>
                        <div className='author_list_info'>
                          {loading ? (
                            <Skeleton height={'1rem'} width={'5rem'} />
                          ) : (
                            <Link
                              to={`/author/${item.creatorId}`}
                              data-aos='fade-up'
                            >
                              {item.creatorName}
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className='spacer-40'></div>
                    <h6>Price</h6>
                    <div className='nft-item-price'>
                      <img src={EthImage} alt='' />
                      {loading ? (
                        <Skeleton height={'1rem'} width={'3rem'} />
                      ) : (
                        <span data-aos='fade-up'>{item.price}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
