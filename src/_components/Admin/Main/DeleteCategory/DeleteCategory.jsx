import React, { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { app } from "../../../../../firebasedatabase/firebase";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { MdDelete } from "react-icons/md";
import { useTheme } from "@mui/material/styles";
import { deleteObject, getStorage, listAll, ref } from "firebase/storage";

import { Modal, Typography, Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const db = getFirestore(app);
const storage = getStorage(app);

const fetchCategoriesWithPosts = async () => {
  try {
    const categoriesSnapshot = await getDocs(collection(db, "categories"));
    const categoriesData = await Promise.all(
      categoriesSnapshot.docs.map(async (categoryDoc) => {
        const categoryData = categoryDoc.data();
        const postsSnapshot = await getDocs(
          collection(db, `categories/${categoryDoc.id}/posts`)
        );
        const posts = postsSnapshot.docs.map((postDoc) => ({
          id: postDoc.id,
          ...postDoc.data(),
        }));
        return { id: categoryDoc.id, ...categoryData, posts };
      })
    );
    return categoriesData;
  } catch (error) {
    console.error("Error fetching categories with posts:", error);
    throw error;
  }
};

const DeleteCategory = () => {
  const [categories, setCategories] = useState([]);

  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const [modalText, setModalText] = useState("");

  const [loader, setLoader] = useState(true);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open, setOpen] = useState(false);

  const fetchData = async () => {
    setLoader(true);
    const data = await fetchCategoriesWithPosts();
    setCategories(data);
    setLoader(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const deletePost = async (category, post) => {
    try {
      setLoader(true);
      const categoryRef = doc(db, `categories/${category.id}`);
      await updateDoc(categoryRef, { postLength: increment(-1) });

      const postRef = doc(db, `categories/${category.id}/posts`, post.id);

      await deleteDoc(postRef);

      const imageRef = ref(
        storage,
        `categories/${category.id}/posts/${post.combineId}`
      );

      await deleteObject(imageRef);

      await clearAllCaches();

      fetchData();

      setModalText("✅ Post deleted succesfully");
      handleOpen();
    } catch (error) {
      setModalText(error.message);
      handleOpen();
    } finally {
      setLoader(true);
    }
  };

  async function clearAllCaches() {
    const cacheNames = await caches.keys();

    await Promise.all(
      cacheNames.map(async (cacheName) => {
        return caches.delete(cacheName);
      })
    );
  }

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "95%",
    maxWidth: 400,
    bgcolor: "background.paper",
    border: "1px solid #00000",
    boxShadow: 24,
    p: 4,
  };

  const deleteWholeCategory = async (category) => {
    const categoryId = category.id;
    try {
      setLoader(true);
      const categoryRef = doc(db, `categories/${categoryId}`);
      const postsCollectionRef = collection(
        db,
        `categories/${categoryId}/posts`
      );
      const postsSnapshot = await getDocs(postsCollectionRef);
      const deletePostPromises = postsSnapshot.docs.map(async (postDoc) => {
        const postImageRef = ref(storage, postDoc.data().image);
        await deleteObject(postImageRef);
        await deleteDoc(postDoc.ref);
      });
      await Promise.all(deletePostPromises);
      const coverImageRef = ref(
        storage,
        `categories/${categoryId}/coverImage.jpg`
      );
      await deleteObject(coverImageRef);
      await deleteDoc(categoryRef);

      fetchData();
      await clearAllCaches();
      setModalText("✅ Category deleted succesfully");
      handleOpen();
    } catch (error) {
      setModalText(error.message);
      handleOpen();
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      {loader ? (
        <div className="flex items-center justify-center">
          <CircularProgress />
        </div>
      ) : (
        <div className="max-w-[500px] mx-auto">
          {categories.map((category) => {
            return (
              <>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    {category.id}
                    <MdDelete
                      onClick={() => deleteWholeCategory(category)}
                      className="text-xl ml-5 mt-[1px]"
                    />
                  </AccordionSummary>
                  {category.posts.map((post) => {
                    return (
                      <>
                        <AccordionDetails className="relative max-w-[300px] my-4 mx-auto">
                          <img
                            src={post.image}
                            className="max-w-[300px] w-full "
                          />
                          <p style={{ margin: 0 }} className="mt-2 text-lg">
                            {post.title}
                          </p>
                          <MdDelete
                            onClick={() => deletePost(category, post)}
                            className={`text-4xl py-1 ${isDarkMode ? "bg-white" : "bg-gray-200 "} rounded-full cursor-pointer text-red-600 absolute z-10 top-1 right-1`}
                          />
                        </AccordionDetails>
                      </>
                    );
                  })}
                </Accordion>
              </>
            );
          })}
        </div>
      )}

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-description">{modalText}</Typography>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default DeleteCategory;
