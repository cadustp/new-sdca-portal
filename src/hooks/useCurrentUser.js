
function useCurrentUser(){
  const localUser = JSON.parse(localStorage.getItem('user') || '{}');

  return [
    localUser,
    {
      isSubAdmin: localUser?.majority_type === "sub_admin",
      majorityType: localUser?.majority_type 
    }
  ]
}

export default useCurrentUser;