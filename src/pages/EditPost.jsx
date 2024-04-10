import React , { useEffect , useState} from 'react';
import { Container ,PostForm } from '../components';
import service from '../appwrite/options';
import { useParams , useNavigate } from 'react-router-dom';

function EditPost(){
    const [post,setPost] = useState(null);
    const {slug} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if(slug){
            service.getPost(slug).then((post) => {
                if(post)
                {
                    setPost(post);
                }
            })
        }
        else{
            navigate('/');
        }
    },[])
  return post? (
        <div className='py-8'>
            <Container>
                <PostForm post={post}/>
            </Container>
        </div>
  ) : null;
};

export default EditPost;
