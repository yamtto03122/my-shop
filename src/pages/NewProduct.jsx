import React, { useState } from 'react';
import { addProducts } from '../api/firebase';
import styled from 'styled-components';
import { upLoadImg } from '../api/ImgUpload';

function NewProduct() {

    const [product, setProduct] = useState({ //모든 상품의 상태를 빈문자열로 초기화
        title : '',
        price : '',
        option : '',
        category : '',
        caption : ''
    });

    const [file, setFile] = useState(null) //업로드 파일 초기화
    const [isLoading, setIsLoading] = useState(false) //업로드 상태 초기화 (업로드시 true)
    const [success, setSuccess] = useState(null) //업로드 완료 시 완료 상태 체크

    const onChange = (e) => { //타겟이 없기때문에 매개변수 e가 들어가줘야함
        const { name, value, files } = e.target;

        if(name === 'file' && files && files[0]){ //파일이 있으면
            //files는 파일정보를 뜻함
            setFile(files[0]); //setFlie에 옮겨서 어ㅏㅂ로드
            console.log(files[0]);
        }else{
            setProduct((prevProduct)=>({ ...prevProduct,[name] : value }))
        }

        // setProduct((prevProduct)=>({...prevProduct,[name] : value}))
    }

    const onSubmit = async(e) => { //파이어베이스에 등록을 해줘야 하기 때문에 어싱크 사용 (자료 올라가는중)

        e.preventDefault(); //기본 이벤트를 없애는 기능이 없기 때문에 e.preventDefualt()를 항상 꼭 넣어줄것!
        setIsLoading(true);

        try{
            const url = await upLoadImg(file)
            await addProducts(product, url); //파이어베이스 연동 스크립트
            setSuccess('Upload completed');

            setTimeout(()=>{  //setSuccess('Upload completed'); 2초 뒤에 사라지게하기
                setSuccess(null);
            },2000);

            setProduct({ //업로드가 가 되면, 리셋시켜줘라
                title : '',
                price : '',
                option : '',
                category : '',
                caption : ''
            })

            setFile(null); //이미지 업로드
            
        }catch(error){
            console.error(error);
            //setError('업로드 실패')

        } finally{ // 마지막에 업로드됐다 -> 초기화
            setIsLoading(false);
        }
    }

    return (
        <div className='container'>
            <FormContainer>
                    {success && <p className='resultText'>{success}</p>}
                    <div className='imgWrap'>
                        {file &&(<img src={URL.createObjectURL(file)} alt={product.title}/>)}
                    </div>
                <form onSubmit={onSubmit}>

                    {/* 이미지 업로드 */}
                    <input type='file' name='file' accept='image/*' onChange={onChange}/>
                    
                    {/* 제목 */}
                    <input type='text' name='title' placeholder='상품명' value={product.title} onChange={onChange}/>
                    
                    {/* 가격설정 */}
                    <input type='text' name='price' placeholder='상품가격' value={product.price} onChange={onChange}/>
                    
                    {/* 상품 카테고리 */}
                    <input type='text' name='category' placeholder='상품분류' value={product.category} onChange={onChange}/>
                    
                    {/* 상품 옵션 */}
                    <input type='text' name='option' placeholder='상품 옵션' value={product.option} onChange={onChange}/> 

                    {/* 상품 옵션 */}
                    <input type='text' name='caption' placeholder='상품 설명' value={product.caption} onChange={onChange}/> 

                    <button disabled={isLoading}>
                        {isLoading ? 'Uploading' : 'To register'}
                    </button>
                </form>
            </FormContainer>
            
        </div>
    );
}


export default NewProduct;

const FormContainer = styled.div`
    max-width: 1280px;
    padding: 30px 0;
    margin: 0 auto;
    display: flex;
    gap: 40px;

    .imgWrap{
        max-width: 500px;
        height: 500px;
        img{
            display: block;
            height: 100%;
        }
    }
    form{
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 20px;
        input{
            width: 100%;
            box-sizing: border-box;
            height: 40px;
            border-radius: 4px;
            border: none;
            padding: 0 10px

        }
        button{
            margin-top: 50px;
            height: 50px;
            border-radius: 5px;
            background: #008cff;
            border: none;
            color: #ffffff;
            font-size: 17px;
            font-weight: bold;
        }
    }
`