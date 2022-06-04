import React, { useEffect, useState } from 'react';
import { Text, Dimensions, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import styled,{css} from 'styled-components/native';
import axios from "axios";


const Home = () => {
   const [slides, setSlides] = useState([
      {
       "__typename": "Synopsis",
       "author": null,
       "genres":  [
         "여+남",
         "불륜",
         "시대극",
       ],
       "id": "348f8911-4b74-40fa-883d-8fd5505e0a15",
       "poster": "https://imagedelivery.net/DAh_J1-4YW-zMNrkcEnK_w/1ede095e-4668-452c-d1f1-9cba8a88b300/large",        
       "summary": "분명 들어오지 말라 했는데... 형수님이 원한 건 이런 건가요?형님한테 만족 못 하시는 겁니까 아니면 옛정이 그리운 겁니까.",
       "title": null,
       "titleImage": "https://imagedelivery.net/DAh_J1-4YW-zMNrkcEnK_w/80a77459-02c9-4f08-de50-0d892a47b700/large",    
     },
      {
       "__typename": "Synopsis",
       "author": null,
       "genres":  [
         "남+나",
         "오피스",
         "체벌",
       ],
       "id": "1cf97eac-6345-4417-a284-22379bfbaaf6",
       "poster": "https://imagedelivery.net/DAh_J1-4YW-zMNrkcEnK_w/a655c8df-26ef-41c5-378b-fe8ee1c13400/large",        
       "summary": "벌이요? 설마.. 대표님. 저희 사무실에서는 안 하기로 했잖아요.아무리 그래도 여기는... 지금 밖에 직원분들도 계신데.",
       "title": null,
       "titleImage": "https://imagedelivery.net/DAh_J1-4YW-zMNrkcEnK_w/23df0493-53f8-4c4d-b980-739f50531c00/large",    
     },
      {
       "__typename": "Synopsis",
       "author": null,
       "genres":  [
         "남+여",
         "집착",
         "토이",
       ],
       "id": "4aef8a3b-9f5f-4011-b92f-84aafdf04779",
       "poster": "https://imagedelivery.net/DAh_J1-4YW-zMNrkcEnK_w/fc49fbcd-8260-460e-4111-45290540d200/public",       
       "summary": "우리 지우, 오랜만이네. 잘 지냈어? 우리 옛날처럼놀아보자, 오랜만에. 벗을래 아니면 내가 직접 벗겨줄까?",
       "title": null,
       "titleImage": "https://imagedelivery.net/DAh_J1-4YW-zMNrkcEnK_w/d99f855b-ea08-4333-50c3-9fc8c8d5f300/public",   
     },
      {
       "__typename": "Synopsis",
       "author": null,
       "genres":  [
         "남+나",
         "강의실",
         "몰래",
       ],
       "id": "925c21e9-dc6a-424b-8eb9-22c1cc98e1c0",
       "poster": "https://imagedelivery.net/DAh_J1-4YW-zMNrkcEnK_w/85d45e1c-63f4-4500-c1b6-51df32851900/public",
       "summary": "다들 자느라 정신없네. 불 다 꺼놓고 발표해서 그런가.왜, 아무도 안 보잖아. 이렇게 하면 어때? 쉿. 다 들리겠다.",
       "title": null,
       "titleImage": "https://imagedelivery.net/DAh_J1-4YW-zMNrkcEnK_w/c94ffe52-510c-470d-74dc-c4b7e1f87000/public",   
     },
      {
       "__typename": "Synopsis",
       "author": null,
       "genres":  [
         "여+남",
         "대표님",
         "로맨스",
       ],
       "id": "e2a26a4c-8212-49a9-9b81-5d30b0be8b55",
       "poster": "https://imagedelivery.net/DAh_J1-4YW-zMNrkcEnK_w/7ead3061-bc21-418b-8d24-0aacc8150600/public",       
       "summary": "착각을 좀 하는 스타일이네. 뭐.. 그럴 이유가 아예 없진 않습니다.우울한 표정 짓고 있는 게 거슬려서요. 됐어요?",
       "title": null,
       "titleImage": "https://imagedelivery.net/DAh_J1-4YW-zMNrkcEnK_w/dc883737-0f69-42ed-6272-395dd4c91900/public",   
     },
      {
       "__typename": "Synopsis",
       "author": null,
       "genres":  [
         "여+남",
         "재벌",
         "호텔",
       ],
       "id": "7b242283-f1c4-4d86-add8-ecb3b276eac1",
       "poster": "https://imagedelivery.net/DAh_J1-4YW-zMNrkcEnK_w/5f9d6516-e5e5-4bfd-4616-a1209e605200/public",       
       "summary": "그렇게 벗은 채로 쳐다보면서 이야기하면 웬만한 여자들은다 당황해. 아니, 난 달라. 어떤 여자이길 바라는데?",
       "title": null,
       "titleImage": "https://imagedelivery.net/DAh_J1-4YW-zMNrkcEnK_w/138b0010-f922-4b21-9f53-71b80c154900/public",   
     },
      {
       "__typename": "Synopsis",
       "author": null,
       "genres":  [
         "남+남",
         "계략공",
         "로맨스",
       ],
       "id": "48692f47-092d-4352-9a7c-bee692bf6b2b",
       "poster": "https://imagedelivery.net/DAh_J1-4YW-zMNrkcEnK_w/5f9d6516-e5e5-4bfd-4616-a1209e605200/public",       
       "summary": "말이 회사 동료지, 거의 매일 보는 사이니까요.오해할 수도 있죠. 뭐… 꼭 오해가 아닐 수도 있구요.",
       "title": null,
       "titleImage": "https://imagedelivery.net/DAh_J1-4YW-zMNrkcEnK_w/138b0010-f922-4b21-9f53-71b80c154900/public",   
     },
      {
       "__typename": "Synopsis",
       "author": null,
       "genres":  [
         "남+나",
         "과외",
         "제자",
       ],
       "id": "35b716bd-ffff-458f-ac36-b4f78c670f7a",
       "poster": "https://imagedelivery.net/DAh_J1-4YW-zMNrkcEnK_w/5f9d6516-e5e5-4bfd-4616-a1209e605200/public",       
       "summary": "다 비쳐요. 좀 크더라도 그 옷 입고 가요. 신경 쓰인다고, 내가.선생님은... 아니, 너는 내가 남자로도 안 보이지?",
       "title": null,
       "titleImage": "https://imagedelivery.net/DAh_J1-4YW-zMNrkcEnK_w/138b0010-f922-4b21-9f53-71b80c154900/public",   
     },
   ]);

   useEffect(() => {
       getMainApi()
      // console.log('slides[0] :>> ', slides[0]);
   }, []);

   const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImZmN2I3OWZmLTk3NGUtNGFmYS1hYzhmLTEyYmViNWIyZDk0OSIsInJvbGUiOiJURVNUX1VTRVIiLCJpYXQiOjE2NTQyMTk4NjAsImV4cCI6MTY1NDQ0MTI1OX0.ycBp-_S3dnPUA2j3u38mRKB_zsyuLeQM7UzLWtT0FFE";

   const getMainApi = async () => {

      try {
         axios.defaults.baseURL = 'https://api.plingcast.co.kr/api/v1/';
         axios.defaults.headers.common['Authorization'] = `Bearer ${AUTH_TOKEN}`;
         axios.defaults.headers.post['Content-Type'] = 'application/json';
         axios.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
         const result = await axios.get('test-slides')

         alert(result)
         setSlides(result.data.data)
         //console.log('api :>> ', slides);
      } catch (error) {
         console.log('error :>> ', error);
      }
   }






   return (
      <Container>
         <View style={styles.container}>
            <SwiperFlatList
               showPagination
               paginationStyle={{ left: 10, zIndex: 10 }}
               paginationStyleItem={{ backgroundColor: 'rgb(119, 119, 119)', width: 11, height: 4, borderRadius: 10, marginLeft: 0, marginRight: 5, }}
               paginationStyleItemActive={{ backgroundColor: 'rgb(46, 239, 170)' }}
            >{slides && slides.map((slides, i) =>
               <TouchableOpacity style={styles} key={i} >
                  <Image style={styles.posterImage} source={{ uri: slides.poster }}></Image>
                  <Image style={styles.titleImage} source={{ uri: slides.titleImage }}></Image>
                  <View  style={[styles.child]}>
                     <Text style={styles.summar}>{slides.summary}</Text>
                     <Text style={styles.genres}>{slides.genres}</Text>
                  </View>
               </TouchableOpacity>

            )}

            </SwiperFlatList>
         </View>
      </Container>
   );
};

const Container = styled.ScrollView`
background-color: #000;

`
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
   slide:{position:'relative'},
   container: { flex: 1, backgroundColor: '#000', },
   child: { width, },
   summar: { fontSize:13, textAlign: 'left', color:'#fff',paddingLeft:10, paddingTop:10, },
   genres: { fontSize:13, textAlign: 'left', color:'rgb(46, 239, 170) ',paddingLeft:10,paddingTop:10,paddingBottom:35,  },
   posterImage: {width:width,height:400},
   titleImage:{width:width,height:400,position:'absolute',}
});


export default Home;