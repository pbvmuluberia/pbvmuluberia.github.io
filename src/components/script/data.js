// data.js

/**
 * --- Configuration, Data Storage, and Constants ---
 */

"use strict";

// Language translation dictionary
const translations = {
    'en': {
        'nav_menu': 'Menu',
        'nav_home': 'Home',
        'nav_about': 'About',
        'nav_projects': 'Projects',
        'nav_publications': 'Publications',
        'nav_download': 'Download',
        'nav_contact': 'Contact',
        'carousel_home_name': 'Welcome',
        'carousel_home_des': 'Uluberia Vigyan Kendra',
        'carousel_home_btn': "See What's New",
        'carousel_donate_btn': 'Donate to us',
        'carousel_about_name': 'About',
        'carousel_about_des': 'Learn about us here.',
        'carousel_about_btn': 'Learn About Us',
        'carousel_projects_name': 'Projects',
        'carousel_projects_des': 'Our ongoing and past projects.',
        'carousel_projects_btn': 'View Projects',
        'carousel_publications_name': 'Publications',
        'carousel_publications_des': 'Read our publications and research.',
        'carousel_publications_btn': 'Read Publications',
        'carousel_download_name': 'Download',
        'carousel_download_des': 'Get downloadable resources here.',
        'carousel_download_btn': 'Get Resources',
        'carousel_contact_name': 'Contact',
        'carousel_contact_des': 'Reach out to us anytime.',
        'carousel_contact_btn': 'Get in Touch',
        'donate_title': 'Support Our Mission',
        'donate_choose_amount': 'Choose Amount:',
        'other_amnt': 'Other',
        'donate_scan_qr': 'Scan the QR code below.',
        'donate_open_upi': 'Open in UPI App',
        'donate_upi_id_label': 'UPI ID:',
        'donate_copy_upi': 'Copy UPI ID',
        'donate_note': 'Your generous contribution directly funds our science popularization and community projects.',
        'book_type_magazine': 'Type: Recurring Magazine',
        'book_type_standard': 'Type: Standard Publication',
        'book_no_description': 'No description available for this publication.',
        'book_btn_buy': 'Buy Now',
        'book_btn_subscribe': 'Subscribe',
        'book_btn_download': 'Download / Read More',
        'msg_purchase_dev': 'Purchase/Download feature is under development.',
        'msg_subscribe_dev': 'Subscription feature is under development. Thank you for your interest!',
        'msg_upi_copied': 'UPI ID copied to clipboard!',
        'msg_upi_fail': 'Failed to copy UPI ID.',
        'pub_subscribe_prompt': 'Want to enjoy our regular magazines? Subscribe today!',
        'pub_subscribe_btn': 'Become a Subscriber',
        'pub_featured_title': 'Featured Publications',
        'pub_error_loading': 'Error loading publications. Please check your connection and try again.',
        'notice_title': 'Important Notice',
        'notice_subtitle_en': 'Current Events',
        'notice_subtitle_bn': 'Current Events',
    },
    'bn': {
        'nav_menu': 'মেনু',
        'nav_home': 'হোম',
        'nav_about': 'আমাদের কথা',
        'nav_projects': 'প্রকল্প',
        'nav_publications': 'প্রকাশনা',
        'nav_download': 'ডাউনলোড',
        'nav_contact': 'যোগাযোগ',
        'carousel_home_name': 'অভিনন্দন',
        'carousel_home_des': 'উলুবেড়িয়া বিজ্ঞান কেন্দ্র',
        'carousel_home_btn': 'নতুন কি দেখুন',
        'carousel_donate_btn': 'অনুদান',
        'carousel_about_name': 'আমাদের কথা',
        'carousel_about_des': 'আমাদের সম্পর্কে এখানে জানুন।',
        'carousel_about_btn': 'আমাদের সম্পর্কে জানুন',
        'carousel_projects_name': 'কর্মলাপ',
        'carousel_projects_des': 'আমাদের চলমান এবং অতীত কর্মকলাপ সমুহ।',
        'carousel_projects_btn': 'কর্মলাপ সম্পর্কে জানুন',
        'carousel_publications_name': 'প্রকাশনা',
        'carousel_publications_des': 'আমাদের প্রকাশনাগুলি পড়ুন।',
        'carousel_publications_btn': 'প্রকাশনা পড়ুন',
        'carousel_download_name': 'ডাউনলোড',
        'carousel_download_des': 'ডাউনলোডযোগ্য নথিগুলি এখানে পান।',
        'carousel_download_btn': 'বিস্তারিত দেখুন',
        'carousel_contact_name': 'যোগাযোগ',
        'carousel_contact_des': 'যেকোনো সময় আমাদের সাথে যোগাযোগ করুন।',
        'carousel_contact_btn': 'যোগাযোগ করুন',
        'donate_title': 'আমাদের পাশে দাঁড়ান',
        'donate_choose_amount': 'পরিমাণ চয়ন করুন:',
        'other_amnt': 'পছন্দসই',
        'donate_scan_qr': 'নীচের QR কোড স্ক্যান করুন।',
        'donate_open_upi': 'UPI অ্যাপে খুলুন',
        'donate_upi_id_label': 'UPI ID:',
        'donate_copy_upi': 'UPI ID কপি করুন',
        'donate_note': 'আপনার সহযোগীতা সরাসরি আমাদের বিজ্ঞান জনপ্রিয়করণ এবং কার্যকলাপগুলিকে অর্থায়ন করে।',
        'book_type_magazine': 'ধরন: ধারাবাহিক পত্রিকা',
        'book_type_standard': 'ধরন: বই',
        'book_no_description': 'এই প্রকাশনার জন্য কোন বিবরণ উপলব্ধ নেই।',
        'book_btn_buy': 'এখনই কিনুন',
        'book_btn_subscribe': 'গ্রাহক হন',
        'book_btn_download': 'ডাউনলোড / আরও পড়ুন',
        'msg_purchase_dev': 'ক্রয়/ডাউনলোড বৈশিষ্ট্যটি নির্মাণাধীন।',
        'msg_subscribe_dev': 'সাবস্ক্রিপশন বৈশিষ্ট্যটি নির্মাণাধীন। আপনার আগ্রহের জন্য ধন্যবাদ!',
        'msg_upi_copied': 'UPI ID ক্লিপবোর্ডে কপি করা হয়েছে!',
        'msg_upi_fail': 'UPI ID কপি করতে ব্যর্থ।',
        'pub_subscribe_prompt': ' আপনি কি আমাদের নিয়মিত পত্রিকা উপভোগ করতে চান? আজই গ্রাহক হন!',
        'pub_subscribe_btn': 'গ্রাহক হন',
        'pub_featured_title': ' পত্রিকা ও বই',
        'pub_error_loading': 'প্রকাশনা লোড করতে ত্রুটি। অনুগ্রহ করে আপনার সংযোগ পরীক্ষা করুন এবং আবার চেষ্টা করুন।',
        'notice_title': 'গুরুত্বপূর্ণ বিজ্ঞপ্তি',
        'notice_subtitle_en': 'বর্তমান ঘটনাবলী',
        'notice_subtitle_bn': 'বর্তমান ঘটনাবলী',
    }
};

const JSON_URL_EN = "https://gist.githubusercontent.com/pbvmuluberia/b6bf520cce8c1b0167a6657b2c60e4d2/raw/eb327ee9d32d9f3e57f45c4dd0c6c2ec16c4d895/book.json";
const JSON_URL_BN = "https://gist.githubusercontent.com/pbvmuluberia/e5e2122ddf3ac7489e61be9f81e475fd/raw/211d2029afbc4e1785f7bc22e552f459493b64e1/book_bn.json";

// Global data store for fetched book data
window.bookData = { en: null, bn: null };

// UPI payment constants
const UPI_ID = '9433361030@ucobank';
const VPA_NAME = 'Paschim Banga Vigyan Mancha (Uluberia Vigyan Kendra)'; 

// State variables
let currentDonationAmount = 100;
let isInitialized = false;

// Attach translations to window for access in other files
window.translations = translations;
window.JSON_URL_EN = JSON_URL_EN;
window.JSON_URL_BN = JSON_URL_BN;
window.UPI_ID = UPI_ID;
window.VPA_NAME = VPA_NAME;
window.currentDonationAmount = currentDonationAmount;
window.isInitialized = isInitialized;
