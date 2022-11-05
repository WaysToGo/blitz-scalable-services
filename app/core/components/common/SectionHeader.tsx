import React, { Suspense, useState } from "react"
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles"
import { PhotoLibraryOutlined } from "@material-ui/icons"
import UploadMedia from "./UploadMedia"
import SectionImages from "./SectionImages"
import Loader from "../Loader"
import { getSignedUrl } from "app/core/utils/aws"
import Link from "@material-ui/core/Link"
import themeColors from "app/core/theme/colors"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sectionTitle: {
      display: "flex",
      position: "relative",
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: themeColors.secondary.light,
      padding: "12px 12px 10px 20px",
      borderRadius: "5px",
      fontSize: "14px",
      fontWeight: 600,
      color: "#484747",
    },
    uploadIcon: {
      height: "20px",
      width: "20px",
      marginLeft: "20px",
      cursor: "pointer",
    },
  })
)

function SectionHeader({ sectionId, sectionName, section, currentUser, storeInfo }) {
  const [showImageModal, setShowImageModal] = useState(false)
  const showPopup = () => {
    setShowImageModal(true)
  }
  const classes = useStyles()
  return (
    <Suspense fallback={<Loader />}>
      <div className={classes.sectionTitle}>
        {section?.link ? (
          <Link
            href={getSignedUrl(section.link)}
            target="_blank"
            rel="/ noreferrer"
            underline="hover"
          >
            {section.name}
          </Link>
        ) : (
          <span>{section.name}</span>
        )}

        {section.isUploadEnabled && (
          <span>
            <PhotoLibraryOutlined className={classes.uploadIcon} onClick={() => showPopup()} />
            <UploadMedia
              sectionId={sectionId}
              sectionName={sectionName}
              subSectionName={section.name}
              fields={section.fields}
              currentUser={currentUser}
              storeInfo={storeInfo}
            />
          </span>
        )}
      </div>
      {showImageModal && (
        <SectionImages
          open={showImageModal}
          groupBy={"fieldname"}
          where={{
            subsectionname: section.name,
            isdeleted: false,
          }}
          handleImageModal={() => setShowImageModal(false)}
        />
      )}
    </Suspense>
  )
}

export default SectionHeader
