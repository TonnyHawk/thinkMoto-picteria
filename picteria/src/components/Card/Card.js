import React, {
   Component
} from 'react';

class Card extends Component {
   constructor(props) {
      super(props)
      this.dropArea = React.createRef();
      this.input = React.createRef();
      this.state = {
         files: [],
         fileInfos: [],
         uploadedState: false
      }
      this.uploadFile = this.uploadFile.bind(this)
   }

   handleFiles(files) {
      if(files === 'input'){
         files = this.input.current.files;
      }
      files = [...files];
      this.setState(state=>{

         state.files = files;

         let fileInfos = [];
         files.forEach(elem=>{
            fileInfos.push({
               name: elem.name,
               progress: null
            })
         })

         state.fileInfos = fileInfos;

         return state
      }, ()=>{
         (this.state.files).forEach(this.uploadFile);
      });
   }

   handleDrop(e){
      let dt = e.dataTransfer
      let files = dt.files

      this.handleFiles(files)
   }

   uploadFile(file) {

      // Create a root reference
      var storageRef = window.firebase.storage().ref();

      // Create a reference to new file
      var fileRef = storageRef.child('picteria/' + file.name);
      let index = this.state.files.indexOf(file)
      console.log('index: '+this.state.files.indexOf(file));
      this.setState(state=>{
         state.fileInfos[index].ref = fileRef
         return state
      })

      // 'file' comes from the Blob or File API
      let uploadTask = fileRef.put(file);

      uploadTask.on('state_changed',
         (snapshot) => {

            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            this.setState(state=>{
               state.fileInfos[index].progress = progress
               return state
            })
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
               case window.firebase.storage.TaskState.PAUSED: // or 'paused'
                  console.log('Upload is paused');
                  break;
               case window.firebase.storage.TaskState.RUNNING: // or 'running'
                  console.log('Upload is running');
                  break;
            }
         },
         (error) => {
            // Handle unsuccessful uploads
         },
         () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
               console.log('File available at', downloadURL);
            });
         }
      );
   }
   
   componentDidMount() {
      let dropArea = this.dropArea.current;
      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
         dropArea.addEventListener(eventName, preventDefaults, false)
      })

      function preventDefaults(e) {
         e.preventDefault();
         e.stopPropagation();
      }


      ['dragenter', 'dragover'].forEach(eventName => {
         dropArea.addEventListener(eventName, highlight, false)
      });

      ['dragleave', 'drop'].forEach(eventName => {
         dropArea.addEventListener(eventName, unhighlight, false)
      });

      function highlight(e) {
         dropArea.classList.add('is-highlighted')
      }

      function unhighlight(e) {
         dropArea.classList.remove('is-highlighted')
      }

      dropArea.addEventListener('drop', (e)=>this.handleDrop(e), false)

   }

   render() {

      let {files, fileInfos} = this.state;

      let i = 0;

      files = files.map(file=>{
         let progress = fileInfos[i].progress === null ? '0' : fileInfos[i].progress;
         i = i + 1;
         return (<div className="card__file file" key={file.name}>
         <div className="file__icon file__icon--jpg" />
         <div className="file__info">
           <div className="flex justify-content-between">
             <p className="file__name">{file.name}</p>
             <div className="file__progress-indicator">
               <p className="file__progress-indicator-txt">
                  {progress}%
               </p>
               <div className="file__progress-indicator-status">
                 <div className="status-btn" />
               </div>
             </div>
           </div>
           <div className="file__progress-bar progress-bar">
             <div className="progress-bar__line" style={{width: progress+'%'}}/>
           </div>
         </div>
         <div className="file__status">
           <div className="status-btn" />
         </div>
       </div>)
      })

      let sectionFiles, cardFooter = '';
      if(files.length !== 0){
         sectionFiles = (
            <div className="card__files">
               <h2 className="card__heading">Uploading files</h2>
               {files}
            </div>
         );
         cardFooter = (
         <div className="card__footer">
            <p className="btn is-disabled">Go next</p>
         </div>
         );
      }



      return ( 
      <div id="card" className="card">
      <div className="card__close-btn">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M23 1L1.5 22.5M1.5 1L23 22.5" stroke="black" strokeWidth={2} />
        </svg>
      </div>
      <div className="card__header">
        <h1 className="card__title">Upload your files</h1>
        <p className="card__text">Files should be jpg or png</p>
      </div>
      <div className="card__body">
        <div className="card__upload-area upload-area" id="card-upload-area" ref={this.dropArea}>
          <form className="upload-area__form">
            <input type="file" className="upload-area__file" id="fileElem" ref={this.input} onChange={()=>this.handleFiles('input')} multiple accept="image/*"/>
            <label className="upload-area__button" htmlFor="fileElem">
              <div className="upload-area__inner">
                <svg className="upload-area__icon" width={71} height={72} viewBox="0 0 71 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M65.1844 15.5851H57.2365L56.4194 5.91103C56.2709 4.19321 55.6024 2.5658 54.4882 1.48085C53.374 0.395913 51.9627 -0.146557 50.5514 0.0342662L4.79552 6.00145C1.82436 6.36309 -0.329726 9.61792 0.0416685 13.144L3.68134 55.3663C3.97846 58.7115 6.2811 61.2431 9.02943 61.2431C9.25226 61.2431 9.40082 61.2431 9.62366 61.2431L13.9318 60.7006V64.6787C13.9318 68.2952 16.3088 71.1884 19.2799 71.1884H65.1844C68.1555 71.1884 70.5324 68.2952 70.5324 64.6787V22.1852C70.5324 18.5687 68.1555 15.5851 65.1844 15.5851ZM13.8576 22.1852V55.3663L9.10371 55.9992C8.58375 56.0896 7.98952 55.5471 7.98952 54.9142L4.34985 12.6015C4.34985 12.1495 4.49841 11.8782 4.57269 11.6974C4.64697 11.5166 4.8698 11.3357 5.2412 11.2453L50.9228 5.36856H50.9971C51.2942 5.36856 51.517 5.54939 51.6656 5.6398C51.8141 5.73021 51.9627 6.00145 52.037 6.45351L52.854 15.5851H19.2056C16.2345 15.5851 13.8576 18.5687 13.8576 22.1852ZM66.15 64.6787C66.15 65.402 65.7043 65.9445 65.1101 65.9445H19.2056C18.6114 65.9445 18.1657 65.402 18.1657 64.6787V46.4155L26.9307 35.7469C27.8963 34.5716 29.4562 34.5716 30.4218 35.7469L48.0259 57.1745C48.4716 57.717 48.9915 57.9882 49.5858 57.9882C50.18 57.9882 50.6999 57.717 51.1456 57.1745C51.9627 56.18 51.9627 54.4622 51.1456 53.4677L49.2144 51.1169L53.7454 45.6018C53.8939 45.421 54.1911 45.421 54.3396 45.6018L66.15 60.0677V64.6787ZM66.15 52.5635L57.3851 41.8949C55.5281 39.6346 52.4826 39.6346 50.6257 41.8949L46.1689 47.4101L33.5415 32.0401C32.2788 30.5031 30.5703 29.5989 28.7134 29.5989C26.8564 29.5989 25.148 30.5031 23.8852 32.0401L18.1657 38.9114V22.1852C18.1657 21.4619 18.6114 20.9194 19.2056 20.9194H65.1101C65.7043 20.9194 66.15 21.4619 66.15 22.1852V52.5635Z" fill="#7E6DE9" />
                </svg>
                <p className="upload-area__text">
                  click to load files
                </p>
              </div>
            </label>
          </form>
        </div>
        {sectionFiles}
      </div>

      {cardFooter}
    </div>
    
      );
   }
}

export default Card;