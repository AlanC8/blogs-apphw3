import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Services } from "./services/services";
import MyModal from "../components/UI/modal/MyModal"; 

import { useRouter } from "next/navigation"; 

const Header = () => {
  const [user, setUser] = useState<{ username?: string }>({});
  const [logged, setLogged] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('access');
    setLogged(false);
    router.push('/blog');
    location.reload();
  };

  const getUser = async () => {
    try {
      const response = await Services.getUser();
      if (response && response.data) {
        setUser(response.data);
        setLogged(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="bg-white">
      <div className="w-[90%] mx-auto py-7 flex content-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Medium Alike emes</h1>
        </div>
        <div>
          {logged ? (
            <>
              <div onClick={() => setModalVisible(true)}>{user?.username}</div>
              <MyModal visible={modalVisible} setVisible={setModalVisible}>
                <button onClick={handleLogout}>Logout</button>
              </MyModal>
            </>
          ) : (
            <Link href="/login" className="py-4">Login</Link>
          )}
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Header;
