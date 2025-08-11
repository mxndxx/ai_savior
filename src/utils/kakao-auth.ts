import { supabase } from "@/utils/supabase";

export async function getKakaoUserInfo(providerToken: string) {
  try {
    console.log("Fetching Kakao user info with token:", providerToken.substring(0, 10) + "...");
    
    const response = await fetch("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${providerToken}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });

    if (!response.ok) {
      console.error("Kakao API response not ok:", response.status, response.statusText);
      throw new Error("Failed to fetch Kakao user info");
    }

    const data = await response.json();
    console.log("Kakao user data:", {
      hasPhoneNumber: !!data.kakao_account?.phone_number,
      hasName: !!data.kakao_account?.name,
      hasEmail: !!data.kakao_account?.email,
    });
    
    return {
      phoneNumber: data.kakao_account?.phone_number,
      name: data.kakao_account?.name,
      email: data.kakao_account?.email,
      profile: data.kakao_account?.profile,
    };
  } catch (error) {
    console.error("Error fetching Kakao user info:", error);
    return null;
  }
}

export async function updateUserMetadata(phoneNumber?: string, name?: string) {
  try {
    const updateData: any = {};
    if (phoneNumber) updateData.phone_number = phoneNumber;
    if (name) updateData.name = name;

    const { error } = await supabase.auth.updateUser({
      data: updateData,
    });

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error updating user metadata:", error);
    return false;
  }
}
